import { ColumnMapper } from '../ColumnMapper/ColumnMapper';
import { isForeignTable } from './IsForeignTable';

export function getForeignTableName(columnMap: string | ColumnMapper): string | null {
    if (isForeignTable(columnMap)) {
        return columnMap.foreignTableName;
    }
    return null;
}
