import { ColumnMap } from './ColumnMap';
import { getSqlSelect } from './GetSqlSelect';
import { mapColumnOutputValue } from './MapColumnOutputValue';

export class ColumnSelect<T> {
    private map: ColumnMap;
    private prefix?: string;
    private tableAlias: string | null;
    public readonly ' unusedTypeIndicator': T;
    public constructor(tableAlias: string | null, map: ColumnMap, prefix?: string) {
        this.tableAlias = tableAlias;
        this.map = map;
        this.prefix = prefix;
        this[' unusedTypeIndicator'] = null as any;
    }

    public getSql() {
        return getSqlSelect(this.tableAlias, this.map, this.prefix);
    }

    public transformOutput(output: { [key: string]: any }, ignoreColumns: Set<string>) {
        Object.keys(this.map).forEach(e => {
            const columnName = this.prefix == null ? e : this.prefix + e;
            if (ignoreColumns.has(columnName) || !Object.prototype.hasOwnProperty.call(output, columnName)) {
                return;
            }
            const column = this.map[e];

            output[columnName] = mapColumnOutputValue(column, output[columnName]);
            ignoreColumns.add(columnName);
        }, output);
    }
}
