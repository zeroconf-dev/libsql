import type { ColumnMap } from '@zeroconf/libsql/ColumnMapper/ColumnMap.js';
import { ForeignColumnChanged } from '@zeroconf/libsql/TemplateInput/ForeignColumnChanged.js';

export function foreignChanged(
    tableName: string,
    tableAlias: string,
    map: ColumnMap,
    paramName: string,
    value: any,
): ForeignColumnChanged {
    return new ForeignColumnChanged(tableName, tableAlias, map, paramName, value);
}
