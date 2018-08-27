import { ColumnMap } from '../ColumnMapper/ColumnMap';
import { ForeignColumnChanged } from '../TemplateInput/ForeignColumnChanged';

export function foreignChanged(
    tableName: string,
    tableAlias: string,
    map: ColumnMap,
    paramName: string,
    value: any,
): ForeignColumnChanged {
    return new ForeignColumnChanged(tableName, tableAlias, map, paramName, value);
}
