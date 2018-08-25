import { ColumnMap } from './ColumnMap';
import { ForeignColumnUpdate } from './ForeignColumnUpdate';

export function foreignUpdate(tableName: string, map: ColumnMap, paramName: string, value: any): ForeignColumnUpdate {
    return new ForeignColumnUpdate(tableName, map, paramName, value);
}
