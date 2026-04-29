import type { ColumnMap } from '@zeroconf/libsql/ColumnMapper/ColumnMap.js';
import { ForeignColumnSelect } from '@zeroconf/libsql/TemplateInput/ForeignColumnSelect.js';

export function foreignSelectNoPrefix<T>(tableName: string, map: ColumnMap): ForeignColumnSelect<T> {
    return new ForeignColumnSelect<T>(tableName, null, map);
}
