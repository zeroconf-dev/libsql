import { ColumnMap } from '@zeroconf/libsql/ColumnMapper/ColumnMap';
import { Escaper } from '@zeroconf/libsql/Runtime/Escaper';
import { getColumnName } from '@zeroconf/libsql/Util/GetColumnName';
import { isForeignTable } from '@zeroconf/libsql/Util/IsForeignTable';
import { isReadOnly } from '@zeroconf/libsql/Util/IsReadOnly';

export class ColumnInputNames {
    public constructor(private readonly columnMap: ColumnMap) {}
    public getSql(escape: Escaper): string {
        return Object.keys(this.columnMap)
            .filter(name => !(isReadOnly(this.columnMap[name]) || isForeignTable(this.columnMap[name])))
            .map(name => escape.identifier(getColumnName(name)))
            .join(',');
    }
}
