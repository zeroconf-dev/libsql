import { ColumnMap } from './ColumnMap';
import { ForeignColumnSelect } from './ForeignColumnSelect';

export function foreignSelect<T>(
    tableName: string,
    tableAlias: string,
    map: ColumnMap,
    prefix: string = '',
): ForeignColumnSelect<T> {
    return new ForeignColumnSelect<T>(tableName, tableAlias, map, prefix);
}
