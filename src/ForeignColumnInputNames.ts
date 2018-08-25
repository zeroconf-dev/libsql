import { ColumnMap } from './ColumnMap';
import { isReadOnly } from './isReadOnly';
import { escapeIdent } from './EscapeIdent';
import { getColumnName } from './GetColumnName';
import { getForeignTableName } from './GetForeignTableName';

export class ForeignColumnInputNames {
    public constructor(private tableName: string, private readonly columnMap: ColumnMap) {}
    public getSql(): string {
        return Object.keys(this.columnMap)
            .filter(
                name =>
                    !isReadOnly(this.columnMap[name]) || getForeignTableName(this.columnMap[name]) === this.tableName,
            )
            .map(name => escapeIdent(getColumnName(name)))
            .join(',');
    }
}
