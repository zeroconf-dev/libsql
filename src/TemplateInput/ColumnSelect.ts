import type { ColumnMap } from '@zeroconf/libsql/ColumnMapper/ColumnMap.js';
import type { Escaper } from '@zeroconf/libsql/Runtime/Escaper.js';
import { getSqlSelect } from '@zeroconf/libsql/Util/GetSqlSelect.js';
import { mapColumnOutputValue } from '@zeroconf/libsql/Util/MapColumnOutputValue.js';

export class ColumnSelect<_T> {
    public constructor(
        private readonly tableAlias: string | null,
        private readonly map: ColumnMap,
        private readonly prefix?: string,
    ) {
        this.tableAlias = tableAlias;
        this.map = map;
        this.prefix = prefix;
    }

    public getSql(escape: Escaper) {
        return getSqlSelect(escape, this.tableAlias, this.map, this.prefix);
    }

    public transformOutput(output: { [key: string]: any }, ignoreColumns: Set<string>) {
        Object.keys(this.map).forEach(e => {
            const columnName = this.prefix == null ? e : this.prefix + e;
            if (ignoreColumns.has(columnName) || !Object.prototype.hasOwnProperty.call(output, columnName)) {
                return;
            }
            const column = this.map[e]!;

            output[columnName] = mapColumnOutputValue(column, output[columnName]);
            ignoreColumns.add(columnName);
        }, output);
    }
}
