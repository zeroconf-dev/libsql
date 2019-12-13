import { ColumnMap } from '@zeroconf/libsql/ColumnMapper/ColumnMap';
import { Escaper } from '@zeroconf/libsql/Runtime/Escaper';
import { getColumnName } from '@zeroconf/libsql/Util/GetColumnName';
import { getForeignTableName } from '@zeroconf/libsql/Util/GetForeignTableName';
import { isReadOnly } from '@zeroconf/libsql/Util/IsReadOnly';

export class ForeignColumnInputNames {
    public constructor(private readonly tableName: string, private readonly columnMap: ColumnMap) {}
    public getSql(escape: Escaper): string {
        return Object.keys(this.columnMap)
            .filter(
                name =>
                    !isReadOnly(this.columnMap[name]) || getForeignTableName(this.columnMap[name]) === this.tableName,
            )
            .map(name => escape.identifier(getColumnName(name)))
            .join(',');
    }
}
