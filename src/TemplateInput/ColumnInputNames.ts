import { ColumnMap } from '../ColumnMapper/ColumnMap';
import { Escaper } from '../Runtime/Escaper';
import { getColumnName } from '../Util/GetColumnName';
import { isForeignTable } from '../Util/IsForeignTable';
import { isReadOnly } from '../Util/IsReadOnly';

export class ColumnInputNames {
    public constructor(private readonly columnMap: ColumnMap) {}
    public getSql(escape: Escaper): string {
        return Object.keys(this.columnMap)
            .filter(name => !(isReadOnly(this.columnMap[name]) || isForeignTable(this.columnMap[name])))
            .map(name => escape.identifier(getColumnName(name)))
            .join(',');
    }
}
