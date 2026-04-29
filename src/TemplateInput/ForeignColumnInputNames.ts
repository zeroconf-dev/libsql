import type { ColumnMap } from '@zeroconf/libsql/ColumnMapper/ColumnMap.js';
import type { Escaper } from '@zeroconf/libsql/Runtime/Escaper.js';
import { getColumnName } from '@zeroconf/libsql/Util/GetColumnName.js';
import { getForeignTableName } from '@zeroconf/libsql/Util/GetForeignTableName.js';
import { isReadOnly } from '@zeroconf/libsql/Util/IsReadOnly.js';

export class ForeignColumnInputNames {
    public constructor(private readonly tableName: string, private readonly columnMap: ColumnMap) {}
    public getSql(escape: Escaper): string {
        return Object.keys(this.columnMap)
            .filter(
                name =>
                    !isReadOnly(this.columnMap[name]!) || getForeignTableName(this.columnMap[name]) === this.tableName,
            )
            .map(name => escape.identifier(getColumnName(name)))
            .join(',');
    }
}
