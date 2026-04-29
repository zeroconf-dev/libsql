import type { ColumnMap } from '@zeroconf/libsql/ColumnMapper/ColumnMap.js';
import { ColumnSelect } from '@zeroconf/libsql/TemplateInput/ColumnSelect.js';

export function select<T>(tableAlias: string, map: ColumnMap, prefix: string = ''): ColumnSelect<T> {
    return new ColumnSelect<T>(tableAlias, map, prefix);
}
