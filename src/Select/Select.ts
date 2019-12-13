import { ColumnMap } from '@zeroconf/libsql/ColumnMapper/ColumnMap';
import { ColumnSelect } from '@zeroconf/libsql/TemplateInput/ColumnSelect';

export function select<T>(tableAlias: string, map: ColumnMap, prefix: string = ''): ColumnSelect<T> {
    return new ColumnSelect<T>(tableAlias, map, prefix);
}
