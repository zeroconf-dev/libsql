import type { ColumnMap } from '@zeroconf/libsql/ColumnMapper/ColumnMap.js';
import { ForeignColumnUpdate } from '@zeroconf/libsql/TemplateInput/ForeignColumnUpdate.js';

export function foreignUpdate(tableName: string, map: ColumnMap, paramName: string, value: any): ForeignColumnUpdate {
    return new ForeignColumnUpdate(tableName, map, paramName, value);
}
