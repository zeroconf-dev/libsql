import type { ColumnMapper } from '@zeroconf/libsql/ColumnMapper.js';
import { isForeignTable } from '@zeroconf/libsql/Util/IsForeignTable.js';

export function getForeignTableName(columnMap: string | ColumnMapper): string | null {
    if (isForeignTable(columnMap)) {
        return columnMap.foreignTableName;
    }
    return null;
}
