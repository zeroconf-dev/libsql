import { ColumnMap } from './ColumnMap';
import { ForeignColumnSelect } from './ForeignColumnSelect';

export function foreignSelectNoPrefix<T>(tableName: string, map: ColumnMap): ForeignColumnSelect<T> {
    return new ForeignColumnSelect<T>(tableName, null, map);
}
