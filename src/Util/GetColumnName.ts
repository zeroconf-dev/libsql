import { ColumnMapper } from '@zeroconf/libsql/ColumnMapper';

export function getColumnName(column: string | ColumnMapper): string {
    return typeof column === 'string' ? column : column.columnName;
}
