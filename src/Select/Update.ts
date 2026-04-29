import type { ColumnMap } from '@zeroconf/libsql/ColumnMapper/ColumnMap.js';
import { ColumnUpdate } from '@zeroconf/libsql/TemplateInput/ColumnUpdate.js';

export function update(map: ColumnMap, paramName: string, value: any): ColumnUpdate {
    return new ColumnUpdate(map, paramName, value);
}
