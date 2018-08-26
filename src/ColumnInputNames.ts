import { ColumnMap } from './ColumnMap';
import { isReadOnly } from './IsReadOnly';
import { isForeignTable } from './IsForeignTable';
import { escapeIdent } from './EscapeIdent';
import { getColumnName } from './GetColumnName';

export class ColumnInputNames {
    public constructor(private readonly columnMap: ColumnMap) {}
    public getSql(): string {
        return Object.keys(this.columnMap)
            .filter(name => !(isReadOnly(this.columnMap[name]) || isForeignTable(this.columnMap[name])))
            .map(name => escapeIdent(getColumnName(name)))
            .join(',');
    }
}
