import { ColumnMap } from '@zeroconf/libsql/ColumnMapper/ColumnMap';
import { Escaper } from '@zeroconf/libsql/Runtime/Escaper';
import { getSqlSelectForForeignTable } from '@zeroconf/libsql/Util/GetSqlSelectForForeignTable';
import { mapColumnOutputValue } from '@zeroconf/libsql/Util/MapColumnOutputValue';

export class ForeignColumnSelect<_T> {
    public constructor(
        private readonly tableName: string,
        private readonly tableAlias: string | null,
        private readonly map: ColumnMap,
        private readonly prefix?: string,
    ) {
        this.prefix = prefix;
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
