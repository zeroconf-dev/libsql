import { ColumnMapper } from './ColumnMapper';
export function isReadOnly(columnMap: string | ColumnMapper): columnMap is ColumnMapper & { readOnly: true } {
    return typeof columnMap !== 'string' && (columnMap.readOnly || false);
}
