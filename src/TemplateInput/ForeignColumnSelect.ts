import { ColumnMap } from '../ColumnMapper/ColumnMap';
import { Escaper } from '../Runtime/Escaper';
import { getSqlSelectForForeignTable } from '../Util/GetSqlSelectForForeignTable';
import { mapColumnOutputValue } from '../Util/MapColumnOutputValue';

export class ForeignColumnSelect<T> {
    public readonly ' unusedTypeIndicator': T;

    public constructor(
        private readonly tableName: string,
        private readonly tableAlias: string | null,
        private readonly map: ColumnMap,
        private readonly prefix?: string,
    ) {
        this.prefix = prefix;
        this[' unusedTypeIndicator'] = null as any;
    }

    public getSql(escape: Escaper) {
        return getSqlSelectForForeignTable(escape, this.tableName, this.tableAlias as string, this.map, this.prefix);
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
