import { ColumnMapper } from './ColumnMapper';
import { isForeignTable } from './isForeignTable';

export function getForeignTableName(columnMap: string | ColumnMapper): string | null {
    if (isForeignTable(columnMap)) {
        return columnMap.foreignTableName;
    }
    return null;
}
