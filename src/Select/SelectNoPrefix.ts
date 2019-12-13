import { ColumnMap } from '@zeroconf/libsql/ColumnMapper/ColumnMap';
import { ColumnSelect } from '@zeroconf/libsql/TemplateInput/ColumnSelect';

export function selectNoPrefix<T>(map: ColumnMap): ColumnSelect<T> {
    return new ColumnSelect<T>(null, map);
}
