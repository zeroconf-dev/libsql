import type { ColumnMapper } from '@zeroconf/libsql/ColumnMapper.js';

export function getColumnName(column: string | ColumnMapper): string {
    return typeof column === 'string' ? column : column.columnName;
}
