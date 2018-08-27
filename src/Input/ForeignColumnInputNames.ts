import { ColumnMap } from '../ColumnMapper/ColumnMap';
import { isReadOnly } from '../Util/IsReadOnly';
import { getColumnName } from '../Util/GetColumnName';
import { getForeignTableName } from '../Util/GetForeignTableName';
import { Escaper } from '../Runtime/Escaper';

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
