import type { ColumnMap } from '@zeroconf/libsql/ColumnMapper/ColumnMap.js';
import type { Escaper } from '@zeroconf/libsql/Runtime/Escaper.js';
import { getColumnName } from '@zeroconf/libsql/Util/GetColumnName.js';
import { isForeignTable } from '@zeroconf/libsql/Util/IsForeignTable.js';
import { isReadOnly } from '@zeroconf/libsql/Util/IsReadOnly.js';

export class ColumnInputNames {
    public constructor(private readonly columnMap: ColumnMap) {}
    public getSql(escape: Escaper): string {
        return Object.keys(this.columnMap)
            .filter(name => !(isReadOnly(this.columnMap[name]!) || isForeignTable(this.columnMap[name]!)))
            .map(name => escape.identifier(getColumnName(name)))
            .join(',');
    }
}
