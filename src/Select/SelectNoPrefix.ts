import type { ColumnMap } from '@zeroconf/libsql/ColumnMapper/ColumnMap.js';
import { ColumnSelect } from '@zeroconf/libsql/TemplateInput/ColumnSelect.js';

export function selectNoPrefix<T>(map: ColumnMap): ColumnSelect<T> {
    return new ColumnSelect<T>(null, map);
}
