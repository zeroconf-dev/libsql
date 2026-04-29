import type { ColumnMapper } from '@zeroconf/libsql/ColumnMapper.js';

export function isReadOnly(columnMap: string | ColumnMapper): columnMap is ColumnMapper & { readOnly: true } {
    return typeof columnMap !== 'string' && (columnMap.readOnly || false);
}
