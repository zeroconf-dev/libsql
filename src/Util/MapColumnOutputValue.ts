import type { ColumnMapper } from '@zeroconf/libsql/ColumnMapper.js';

export function mapColumnOutputValue(columnMap: string | ColumnMapper, value: any): any {
    if (value == null) {
        return;
    }
    if (typeof columnMap === 'string' || typeof columnMap.output !== 'object') {
        return value;
    }
    return columnMap.output.mapValue(value);
}
