import { TableTypeSpec } from './TableTypeSpec';
import { escapeIdent } from './EscapeIdent';
import { Client } from './Client';
import { InsertionGroup } from './InsertionGroup';
import { TableType } from './TableType';
import { InputTable } from './InputTable';

export class InputTableWithValues<TSpec extends TableTypeSpec, TDB = any> {
    private static readonly MIN_ROWS_BEFORE_CREATE_INDEX = 20;
    private createTablePromise: Promise<void> | null = null;
    private readonly rowInsertions: [InsertionGroup, number[]][];
    private tempTableName: string | null = null;

    public constructor(
        public readonly inputTable: InputTable<TSpec>,
        public readonly values: ReadonlyArray<TableType<TSpec>>,
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
        const quotedTableName = escapeIdent(this.getTemporaryTableName());
        const columns = this.inputTable.columns;

        const createTableQuery = client.query(`
            CREATE TEMPORARY TABLE ${quotedTableName} (
                ${columns}
            ) ON COMMIT DROP:
        `);

        const commaSeparatedColumns = this.inputTable.commaSeparatedColumnNames;
        const insertionGroups = this.rowInsertions;
        const insertPromieses: Promise<any>[] = [];

        for (const insertionGroup of insertionGroups) {
            const inputParams = this.inputTable.inputParams[insertionGroup[0]];
            const insertQueryText = `INSERT INTO ${quotedTableName} (${commaSeparatedColumns}) VALUES ${inputParams};`;
            const insertQueryName = `tmp_insert_${insertionGroup[0]}_${quotedTableName}`;

            const values = [...insertionGroup[1].map(idx => this.inputTable.mapInputValue(this.values[idx], idx))];

            insertPromieses.push(client.query(insertQueryText, values, insertQueryName));
        }

        const indexDefinitions: string[] =
            this.values.length >= InputTableWithValues.MIN_ROWS_BEFORE_CREATE_INDEX
                ? this.inputTable.getIndexDefinitions(quotedTableName)
                : [];

        const indexDefPromises = indexDefinitions.map(sql => client.query(sql));

        return Promise.all([createTableQuery, ...insertPromieses, ...indexDefPromises]).then(_ => {
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
        this.tempTableName = escapeIdent('tmp_sqlu_' + this.inputTable.name + client.getTransactionUniqueNumber());
    }
}
