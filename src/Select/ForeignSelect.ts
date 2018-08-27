import { ColumnMap } from '../ColumnMapper/ColumnMap';
import { ForeignColumnSelect } from '../TemplateInput/ForeignColumnSelect';

export function foreignSelect<T>(
    tableName: string,
    tableAlias: string,
    map: ColumnMap,
    prefix: string = '',
): ForeignColumnSelect<T> {
    return new ForeignColumnSelect<T>(tableName, tableAlias, map, prefix);
}
