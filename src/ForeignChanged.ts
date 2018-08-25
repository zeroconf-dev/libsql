import { ColumnMap } from './ColumnMap';
import { ForeignColumnChanged } from './ForeignColumnChanged';

export function foreignChanged(
    tableName: string,
    tableAlias: string,
    map: ColumnMap,
    paramName: string,
    value: any,
): ForeignColumnChanged {
    return new ForeignColumnChanged(tableName, tableAlias, map, paramName, value);
}
