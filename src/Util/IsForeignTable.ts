import type { ColumnMapper } from '@zeroconf/libsql/ColumnMapper.js';

export function isForeignTable(
    columnMap: string | ColumnMapper,
): columnMap is ColumnMapper & { foreignTableName: string } {
    return typeof columnMap !== 'string' && columnMap.foreignTableName != null;
}
