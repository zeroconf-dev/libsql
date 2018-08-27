import { ColumnMapper } from '../ColumnMapper/ColumnMapper';

export function getColumnName(column: string | ColumnMapper): string {
    return typeof column === 'string' ? column : column.columnName;
}
