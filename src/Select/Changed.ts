import type { ColumnMap } from '@zeroconf/libsql/ColumnMapper/ColumnMap.js';
import { ColumnChanged } from '@zeroconf/libsql/TemplateInput/ColumnChanged.js';

export function changed(tableAlias: string, map: ColumnMap, paramName: string, value: any): ColumnChanged {
    return new ColumnChanged(tableAlias, map, paramName, value);
}
