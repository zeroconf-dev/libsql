import { ColumnMap } from '@zeroconf/libsql/ColumnMapper/ColumnMap';
import { ForeignColumnSelect } from '@zeroconf/libsql/TemplateInput/ForeignColumnSelect';

export function foreignSelectNoPrefix<T>(tableName: string, map: ColumnMap): ForeignColumnSelect<T> {
    return new ForeignColumnSelect<T>(tableName, null, map);
}
