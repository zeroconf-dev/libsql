import { ColumnMapper } from '@zeroconf/libsql/ColumnMapper';

export function mapInputValue(columnMap: string | ColumnMapper, value: any): any {
    if (value == null) {
        return null;
    }
    if (typeof columnMap === 'string' || columnMap.input === undefined) {
        return value;
    }

    if (typeof columnMap.input === 'function') {
        return value;
    }

    return columnMap.input.mapValue(value);
}
