import { ColumnMap } from './ColumnMap';
import { ColumnSelect } from './ColumnSelect';

export function select<T>(tableAlias: string, map: ColumnMap, prefix: string = ''): ColumnSelect<T> {
    return new ColumnSelect<T>(tableAlias, map, prefix);
}
