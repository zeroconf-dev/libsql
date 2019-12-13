import { Escaper } from '@zeroconf/libsql/Runtime/Escaper';
import {
    InputTableWithValues,
    InsertionGroup,
    TableType,
    TableTypeSpec,
} from '@zeroconf/libsql/TemplateInput/InputTableWithValues';
import { toSqlValue } from '@zeroconf/libsql/Util/ToSqlValue';

export type KeyMappings<TSpec extends TableTypeSpec> = Partial<{ [key in keyof TableType<TSpec>]: string }>;

export class InputTable<TSpec extends TableTypeSpec> {
    private keys: (keyof TSpec)[];
    public readonly columns: string;
    public readonly commaSeparatedColumnNames: string;
    public readonly inputParams: { [key in InsertionGroup]: string };

    public constructor(
        private readonly escape: Escaper,
        public readonly name: string,
        private readonly spec: TSpec,
        keyMappings: KeyMappings<TSpec>,
        private readonly keyIndexColumnName: string | null = null,
        private readonly indexDefinitions: ((tableName: string) => string[] | string) | null = null,
    ) {
        const quotedIdColumnName = keyIndexColumnName == null ? null : this.escape.identifier(keyIndexColumnName);

        this.keys = Object.keys(spec) as (keyof TSpec)[];
        this.columns = this.keys
            .map(key => {
                const mappedColumnName = keyMappings[key];
                const columnName = mappedColumnName != null ? mappedColumnName : key;

                return this.escape.identifier(String(columnName)) + ' ' + spec[key].databaseType;
            })
            .concat(keyIndexColumnName == null ? [] : [`${quotedIdColumnName} integer NOT NULL UNIQUE`])
            .join(',\n');

        this.commaSeparatedColumnNames = this.keys
            .map(key => {
                const mappedColumnName = keyMappings[key];
                if (mappedColumnName == null) {
                    return this.escape.identifier(String(key));
                }
                return this.escape.identifier(String(mappedColumnName));
            })
            .concat(quotedIdColumnName == null ? [] : [quotedIdColumnName])
            .join(', ');

        const inputParamMapper = (initialAdd: number) => {
            return this.keys
                .concat(keyIndexColumnName == null ? [] : [keyIndexColumnName])
                .map((key, idx) => {
                    const columnSpec =
                        key === keyIndexColumnName
                            ? {
                                  wrapInputValue(e: string) {
                                      return e;
                                  },
                              }
                            : spec[key];
                    const expr = `\$${initialAdd + idx + 1}`;
                    return columnSpec.wrapInputValue(expr);
                })
                .join(', ');
        };

        const params: { [key: string]: string } = {};
        for (let i = 1; i <= 128; i *= 2) {
            const previous = i === 1 ? null : params[i / 2];
            const current: string[] = [];

            for (let j = i === 1 ? 0 : i / 2; j < i; j++) {
                current.push(`(${inputParamMapper(this.keys.length * j)})`);
            }
            params[i.toString()] = previous == null ? current.join(', ') : [previous, current.join(', ')].join(', ');
        }

        this.inputParams = params as any;
    }

    public getIndexDefinitions(tableName: string): string[] {
        if (this.indexDefinitions == null) {
            return [];
        }
        const def = this.indexDefinitions(tableName);
        if (typeof def === 'string') {
            return [def];
        }
        return def;
    }

    public mapInputValue(value: TableType<TSpec>, idx: number): (string | number | null)[] {
        return (this.keys.map(key => toSqlValue(value[key], this.spec[key])) as (string | number | null)[]).concat(
            this.keyIndexColumnName == null ? [] : [idx],
        );
    }

    public withValues(values: readonly TableType<TSpec>[]): InputTableWithValues<TSpec> {
        return new InputTableWithValues(this.escape, this, values);
    }
}
