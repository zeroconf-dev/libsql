import { ColumnMap } from './ColumnMap';
import { ColumnSelect } from './ColumnSelect';

export function selectNoPrefix<T>(map: ColumnMap): ColumnSelect<T> {
    return new ColumnSelect<T>(null, map);
}
