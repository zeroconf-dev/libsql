import { ColumnMapper } from './ColumnMapper';
export function isForeignTable(
    columnMap: string | ColumnMapper,
): columnMap is ColumnMapper & { foreignTableName: string } {
    return typeof columnMap !== 'string' && columnMap.foreignTableName != null;
}
