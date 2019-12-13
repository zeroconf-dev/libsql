import { Adapter } from '@zeroconf/libsql/Adapter';
import { AdapterValue } from '@zeroconf/libsql/Adapter/DataAdapters';
import { Client } from '@zeroconf/libsql/Runtime/Client';
import { Escaper } from '@zeroconf/libsql/Runtime/Escaper';
import { InputTable } from '@zeroconf/libsql/TemplateInput/InputTable';

export type InsertionGroup = 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128;

export interface TableTypeSpec {
    readonly [key: string]: Adapter<any>;
}

export type TableType<TSpec extends TableTypeSpec> = { [key in keyof TSpec]: AdapterValue<TSpec[key]> | null };

export class InputTableWithValues<TSpec extends TableTypeSpec, TDB = any> {
    private static readonly MIN_ROWS_BEFORE_CREATE_INDEX = 20;
    private createTablePromise: Promise<void> | null = null;
    private readonly rowInsertions: [InsertionGroup, number[]][];
    private tempTableName: string | null = null;

    public constructor(
        private escape: Escaper,
        public readonly inputTable: InputTable<TSpec>,
        public readonly values: readonly TableType<TSpec>[],
        public readonly idColumnName: string | null = null,
    ) {
        this.rowInsertions = this.calculateRowInsertions(values.length);
    }

    private calculateRowInsertions(numberOfRows: number): [InsertionGroup, number[]][] {
        let processedRows = 0;
        const result: [InsertionGroup, number[]][] = [];

        for (let g = 128; g >= 1; g /= 2) {
            while (numberOfRows - processedRows >= g) {
                const idxs: number[] = [];
                for (let i = 0; i < g; i++) {
                    idxs.push(processedRows + i);
                }
                result.push([g as InsertionGroup, idxs]);
                processedRows += g;
            }
        }

        return result;
    }

    private createTableImpl(client: Client<TDB>): Promise<void> {
        const quotedTableName = this.escape.identifier(this.getTemporaryTableName());
        const columns = this.inputTable.columns;

        const createTableQuery = client.query(`
            CREATE TEMPORARY TABLE ${quotedTableName} (
                ${columns}
            ) ON COMMIT DROP:
        `);

        const commaSeparatedColumns = this.inputTable.commaSeparatedColumnNames;
        const insertionGroups = this.rowInsertions;
        const insertPromises: Promise<any>[] = [];

        for (const insertionGroup of insertionGroups) {
            const inputParams = this.inputTable.inputParams[insertionGroup[0]];
            const insertQueryText = `INSERT INTO ${quotedTableName} (${commaSeparatedColumns}) VALUES ${inputParams};`;
            const insertQueryName = `tmp_insert_${insertionGroup[0]}_${quotedTableName}`;

            const values = [...insertionGroup[1].map(idx => this.inputTable.mapInputValue(this.values[idx], idx))];

            insertPromises.push(client.query(insertQueryText, values, insertQueryName));
        }

        const indexDefinitions: string[] =
            this.values.length >= InputTableWithValues.MIN_ROWS_BEFORE_CREATE_INDEX
                ? this.inputTable.getIndexDefinitions(quotedTableName)
                : [];

        const indexDefPromises = indexDefinitions.map(sql => client.query(sql));

        return Promise.all([createTableQuery, ...insertPromises, ...indexDefPromises]).then(_ => {
            return;
        });
    }

    public createTable(client: Client<TDB>): Promise<void> {
        if (this.createTablePromise == null) {
            this.createTablePromise = this.createTableImpl(client);
        }
        return this.createTablePromise;
    }

    public getTemporaryTableName(): string {
        if (this.tempTableName == null) {
            throw new Error('Temporary table name not set');
        }
        return this.tempTableName;
    }

    public get hasTableName() {
        return this.tempTableName != null;
    }

    public setTemporaryTableName(client: Client<TDB>): void {
        if (this.tempTableName != null) {
            throw new Error('Temporary table name already set');
        }
        this.tempTableName = this.escape.identifier(
            'tmp_sqlu_' + this.inputTable.name + client.getTransactionUniqueNumber(),
        );
    }
}
