import { TemplateInput } from './TemplateInput';
import { Client } from './Runtime/Client';
import { ColumnSelect } from './TemplateInput/ColumnSelect';
import { ForeignColumnSelect } from './TemplateInput/ForeignColumnSelect';
import { ParamInput } from './TemplateInput/ParamInput';
import { InputTableWithValues } from './TemplateInput/InputTableWithValues';
import { AdapterParamInput } from './TemplateInput/AdapterParamInput';
import { ColumnInputNames } from './TemplateInput/ColumnInputNames';
import { ForeignColumnInputNames } from './TemplateInput/ForeignColumnInputNames';
import { RawInterpolationString } from './TemplateInput/RawInterpolationString';
import { SqlPartString } from './TemplateInput/SqlPartString';
import { ColumnChanged } from './TemplateInput/ColumnChanged';
import { ColumnUpdate } from './TemplateInput/ColumnUpdate';
import { ForeignColumnChanged } from './TemplateInput/ForeignColumnChanged';
import { ForeignColumnUpdate } from './TemplateInput/ForeignColumnUpdate';
import { AffectedRowsMismatchError } from './Error/AffectedRowsMismatchError';
import { NonUniqueResultError } from './Error/NonUniqueResultError';
import { NoResultsFoundError } from './Error/NoResultsFoundError';
import { Platform } from './Runtime/Platform';

function assertNever(_: never, errorMsg: string) {
    throw new Error(errorMsg);
}

export interface ExecuteResult<T> {
    params: any[];
    result: QueryResult<T>;
    sql: string;
}

export interface QueryResult<T> {
    affectedRows: number;
    rows: T[];
}

export class Template<T> {
    public constructor(private readonly queryParts: TemplateStringsArray, private readonly input: TemplateInput<T>[]) {}
    public async execute<TClient extends Client<TDB>, TDB = any>(
        platform: Platform<TClient, TDB>,
    ): Promise<QueryResult<T>> {
        const res = await this.executeImpl(platform);
        return res.result;
    }

    public async executeUpdate<TClient extends Client<TDB>, TDB = any>(
        platform: Platform<TClient, TDB>,
        expectedNumberOfRows?: number,
    ): Promise<void> {
        const res = await this.executeImpl(platform);
        if (expectedNumberOfRows != null && res.result.affectedRows !== expectedNumberOfRows) {
            throw new AffectedRowsMismatchError(res.sql, res.params, expectedNumberOfRows, res.result.affectedRows);
        }
    }

    public async oneOrNullResult<TClient extends Client<TDB>, TDB = any>(
        platform: Platform<TClient, TDB>,
    ): Promise<T | null> {
        const res = await this.executeImpl(platform);
        if (res.result.rows.length === 0) {
            return null;
        }

        if (res.result.rows.length > 1) {
            throw new NonUniqueResultError(res.sql, res.params, res.result.rows.length);
        }

        return res.result.rows[0];
    }

    public async singleResult<TClient extends Client<TDB>, TDB = any>(platform: Platform<TClient, TDB>): Promise<T> {
        const res = await this.executeImpl(platform);

        if (res.result.rows.length === 0) {
            throw new NoResultsFoundError(res.sql, res.params);
        }

        if (res.result.rows.length > 1) {
            throw new NonUniqueResultError(res.sql, res.params, res.result.rows.length);
        }

        return res.result.rows[0];
    }

    private async executeImpl<TClient extends Client<TDB>, TDB = any>(
        platform: Platform<TClient, TDB>,
    ): Promise<ExecuteResult<T>> {
        const mapped = Template.mapInput(this.queryParts, this.input, platform);
        const sql = mapped.sql;
        const params = mapped.parameters;
        const columnSelects = mapped.columnSelects;

        const tableRes = Promise.all(mapped.tables.map(t => t.createTable(platform.client)));
        const queryResPromise = platform.client.query(sql, params);

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

    private static mapInput<T, TClient extends Client<TDB>, TDB = any>(
        queryParts: TemplateStringsArray,
        input: TemplateInput<T>[],
        platform: Platform<TClient>,
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
        Template.addSqlValues(res, addParam, columnSelects, queryParts, input, platform, tables);

        return {
            columnSelects: columnSelects,
            parameters: params,
            sql: res.join(''),
            tables: Array.from(tables.values()),
        };
    }

    private static addSqlValues<T, TClient extends Client<TDB>, TDB = any>(
        sqlRes: string[],
        addParam: (name: string, value: any) => string,
        columnSelects: (ColumnSelect<T> | ForeignColumnSelect<T>)[],
        queryParts: TemplateStringsArray,
        values: TemplateInput<T>[],
        platform: Platform<TClient>,
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
                    sqlRes.push(input.getSql(platform.escape));
                    columnSelects.push(input);
                } else if (input instanceof ColumnInputNames || input instanceof ForeignColumnInputNames) {
                    sqlRes.push(input.getSql(platform.escape));
                } else if (input instanceof RawInterpolationString) {
                    sqlRes.push(input.toString());
                } else if (input instanceof SqlPartString) {
                    Template.addSqlValues(
                        sqlRes,
                        addParam,
                        columnSelects,
                        input.queryParts,
                        input.values,
                        platform,
                        tables,
                    );
                } else if (input instanceof InputTableWithValues) {
                    if (!tables.has(input)) {
                        tables.add(input);
                        if (!input.hasTableName) {
                            input.setTemporaryTableName(platform.client);
                        }
                    }
                    sqlRes.push(input.getTemporaryTableName());
                } else if (
                    input instanceof ColumnChanged ||
                    input instanceof ColumnUpdate ||
                    input instanceof ForeignColumnChanged ||
                    input instanceof ForeignColumnUpdate
                ) {
                    sqlRes.push(input.getSql(platform.escape, addParam));
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
