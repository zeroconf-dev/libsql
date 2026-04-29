import type { ColumnMap } from '@zeroconf/libsql/ColumnMapper/ColumnMap.js';
import { ForeignColumnSelect } from '@zeroconf/libsql/TemplateInput/ForeignColumnSelect.js';

export function foreignSelect<T>(
    tableName: string,
    tableAlias: string,
    map: ColumnMap,
    prefix: string = '',
): ForeignColumnSelect<T> {
    return new ForeignColumnSelect<T>(tableName, tableAlias, map, prefix);
}
