import { ColumnMap } from './ColumnMap';
import { ColumnUpdate } from './ColumnUpdate';

export function update(map: ColumnMap, paramName: string, value: any): ColumnUpdate {
    return new ColumnUpdate(map, paramName, value);
}
