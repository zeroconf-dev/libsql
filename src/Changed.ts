import { ColumnMap } from './ColumnMap';
import { ColumnChanged } from './ColumnChanged';

export function changed(tableAlias: string, map: ColumnMap, paramName: string, value: any): ColumnChanged {
    return new ColumnChanged(tableAlias, map, paramName, value);
}
