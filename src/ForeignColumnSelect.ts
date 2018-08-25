import { ColumnMap } from './ColumnMap';
import { ColumnMapper } from './ColumnMapper';
import { getSqlSelectForForeignTable } from './GetSqlSelectForForeignTable';

function mapColumnOutputValue(columnMap: string | ColumnMapper, value: any): any {
    if (value == null) {
        return null;
    }

    if (typeof columnMap === 'string' || typeof columnMap.output !== 'object') {
        return value;
    }

    return columnMap.output.mapValue(value);
}

export class ForeignColumnSelect<T> {
    private map: ColumnMap;
    private prefix?: string;
    private tableAlias: string | null;
    private tableName: string;

    public readonly ' unusedTypeIndicator': T;

    public constructor(tableName: string, tableAlias: string | null, map: ColumnMap, prefix?: string) {
        this.tableName = tableName;
        this.tableAlias = tableAlias;
        this.map = map;
        this.prefix = prefix;
        this[' unusedTypeIndicator'] = null as any;
    }

    public getSql() {
        return getSqlSelectForForeignTable(this.tableName, this.tableAlias as string, this.map, this.prefix);
    }

    public transformOutput(output: { [key: string]: any }, ignoreColumns: Set<string>) {
        Object.keys(this.map).forEach(e => {
            const columnName = this.prefix != null ? this.prefix + e : e;
            if (ignoreColumns.has(columnName) || !Object.prototype.hasOwnProperty.call(output, columnName)) {
                return;
            }
            const column = this.map[e];

            output[columnName] = mapColumnOutputValue(column, output[columnName]);
            ignoreColumns.add(columnName);
        }, output);
    }
}
