import { ColumnMapper } from '@zeroconf/libsql/ColumnMapper';
import { isForeignTable } from '@zeroconf/libsql/Util/IsForeignTable';

export function getForeignTableName(columnMap: string | ColumnMapper): string | null {
    if (isForeignTable(columnMap)) {
        return columnMap.foreignTableName;
    }
    return null;
}
