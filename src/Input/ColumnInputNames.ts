import { ColumnMap } from '../ColumnMapper/ColumnMap';
import { isReadOnly } from '../Util/IsReadOnly';
import { isForeignTable } from '../Util/IsForeignTable';
import { getColumnName } from '../Util/GetColumnName';
import { Escaper } from '../Runtime/Escaper';

export class ColumnInputNames {
    public constructor(private readonly columnMap: ColumnMap) {}
    public getSql(escape: Escaper): string {
        return Object.keys(this.columnMap)
            .filter(name => !(isReadOnly(this.columnMap[name]) || isForeignTable(this.columnMap[name])))
            .map(name => escape.identifier(getColumnName(name)))
            .join(',');
    }
}
