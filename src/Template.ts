import { TemplateInput } from './TemplateInput';
import { Client } from './Client';
import { QueryResult } from './QueryResult';
import { ExecuteResult } from './ExecuteResult';
import { ColumnSelect } from './ColumnSelect';
import { ForeignColumnSelect } from './ForeignColumnSelect';
import { ParamInput } from './ParamInput';
import { InputTableWithValues } from './InputTableWithValues';
import { AdapterParamInput } from './AdapterParamInput';
import { ColumnInputNames } from './ColumnInputNames';
import { ForeignColumnInputNames } from './ForeignColumnInputNames';
import { RawInterpolationString } from './RawInterpolationString';
import { SqlPartString } from './SQLPartString';
import { ColumnChanged } from './ColumnChanged';
import { ColumnUpdate } from './ColumnUpdate';
import { ForeignColumnChanged } from './ForeignColumnChanged';
import { ForeignColumnUpdate } from './ForeignColumnUpdate';
import { AffectedRowsMismatchError } from './AffectedRowsMismatchError';
import { NonUniqueResultError } from './NonUniqueResultError';
import { NoResultsFoundEror } from './NoResultsFoundError';

function assertNever(_: never, errorMsg: string) {
    throw new Error(errorMsg);
}

export class Template<T, TDB = any> {
    public constructor(private readonly queryParts: TemplateStringsArray, private readonly input: TemplateInput<T>[]) {}
    public async execute(client: Client<TDB>): Promise<QueryResult<T>> {
        const res = await this.executeImpl(client);
        return res.result;
    }

    public async executeUpdate(client: Client<TDB>, expectedNumberOfRows?: number): Promise<void> {
        const res = await this.executeImpl(client);
        if (expectedNumberOfRows != null && res.result.affectedRows !== expectedNumberOfRows) {
            throw new AffectedRowsMismatchError(res.sql, res.params, expectedNumberOfRows, res.result.affectedRows);
        }
    }

    public async oneOrNullResult(client: Client<TDB>): Promise<T | null> {
        const res = await this.executeImpl(client);
        if (res.result.rows.length === 0) {
            return null;
        }

        if (res.result.rows.length > 1) {
            throw new NonUniqueResultError(res.sql, res.params, res.result.rows.length);
        }

        return res.result.rows[0];
    }

    public async singleResult(client: Client<TDB>): Promise<T> {
        const res = await this.executeImpl(client);

        if (res.result.rows.length === 0) {
            throw new NoResultsFoundEror(res.sql, res.params);
        }

        if (res.result.rows.length > 1) {
            throw new NonUniqueResultError(res.sql, res.params, res.result.rows.length);
        }

        return res.result.rows[0];
    }

    private async executeImpl(client: Client<TDB>): Promise<ExecuteResult<T>> {
        const mapped = Template.mapInput(this.queryParts, this.input, client);
        const sql = mapped.sql;
        const params = mapped.parameters;
        const columnSelects = mapped.columnSelects;

        const tableRes = Promise.all(mapped.tables.map(t => t.createTable(client)));
        const queryResPromise = client.query(sql, params);

        await Promise.all([tableRes, queryResPromise]);

        const queryRes = await queryResPromise;

        const affected = queryRes.rowCount;
        const rows = queryRes.rows.map<T>(e => {
            const mappedRow = new Set();
            columnSelects.forEach(cs => cs.transformOutput(e, mappedRow));
            return e;
        });

        return {
            params: params,
            result: {
                affectedRows: affected,
                rows: rows,
            },
            sql: sql,
        };
    }

    private static mapInput<T, TDB = any>(
        queryParts: TemplateStringsArray,
        input: TemplateInput<T>[],
        client: Client<TDB>,
    ) {
        const paramValueMap = new Map<string, string>();
        const params: any[] = [];

        const columnSelects: (ColumnSelect<T> | ForeignColumnSelect<T>)[] = [];

        let paramIdx = 1;

        const addParam = (name: string, value: any) => {
            const paramName = paramValueMap.get(name);
            if (paramName != null) {
                return paramName;
            }

            const result = `\$${paramIdx++}`;
            paramValueMap.set(name, result);
            params.push(value);
            return result;
        };

        const res: string[] = [];

        const tables: Set<InputTableWithValues<any>> = new Set();
        Template.addSqlValues(res, addParam, columnSelects, queryParts, input, client, tables);

        return {
            columnSelects: columnSelects,
            parameters: params,
            sql: res.join(''),
            tables: Array.from(tables.values()),
        };
    }

    private static addSqlValues<T, TDB = any>(
        sqlRes: string[],
        addParam: (name: string, value: any) => string,
        columnSelects: (ColumnSelect<T> | ForeignColumnSelect<T>)[],
        queryParts: TemplateStringsArray,
        values: TemplateInput<T>[],
        client: Client<TDB>,
        tables: Set<InputTableWithValues<any>>,
    ): void {
        for (let i = 0; i < queryParts.length; i++) {
            const str = queryParts[i];
            sqlRes.push(str);

            if (i < values.length) {
                const input = values[i];
                if (input instanceof ParamInput) {
                    sqlRes.push(addParam(input.name, input.value));
                } else if (input instanceof AdapterParamInput) {
                    sqlRes.push('(');
                    const paramString = addParam(input.name, input.value);
                    const typeCastString = input.typeCastString;

                    sqlRes.push(
                        `${input.wrapInput(paramString)}${typeCastString == null ? '' : `::${typeCastString}`}`,
                    );
                    sqlRes.push(')');
                } else if (input instanceof ColumnSelect || input instanceof ForeignColumnSelect) {
                    sqlRes.push(input.getSql());
                    columnSelects.push(input);
                } else if (input instanceof ColumnInputNames || input instanceof ForeignColumnInputNames) {
                    sqlRes.push(input.getSql());
                } else if (input instanceof RawInterpolationString) {
                    sqlRes.push(input.toString());
                } else if (input instanceof SqlPartString) {
                    Template.addSqlValues(
                        sqlRes,
                        addParam,
                        columnSelects,
                        input.queryParts,
                        input.values,
                        client,
                        tables,
                    );
                } else if (input instanceof InputTableWithValues) {
                    if (!tables.has(input)) {
                        tables.add(input);
                        if (!input.hasTableName) {
                            input.setTemporaryTableName(client);
                        }
                    }
                    sqlRes.push(input.getTemporaryTableName());
                } else if (
                    input instanceof ColumnChanged ||
                    input instanceof ColumnUpdate ||
                    input instanceof ForeignColumnChanged ||
                    input instanceof ForeignColumnUpdate
                ) {
                    sqlRes.push(input.getSql(addParam));
                } else {
                    return assertNever(
                        input,
                        `Unknown input: ${input == null ? 'null' : (input as any).constructor.name}`,
                    );
                }
            }
        }
    }
}
