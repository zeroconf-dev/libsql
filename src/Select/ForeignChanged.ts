import { ColumnMap } from '@zeroconf/libsql/ColumnMapper/ColumnMap';
import { ForeignColumnChanged } from '@zeroconf/libsql/TemplateInput/ForeignColumnChanged';

export function foreignChanged(
    tableName: string,
    tableAlias: string,
    map: ColumnMap,
    paramName: string,
    value: any,
): ForeignColumnChanged {
    return new ForeignColumnChanged(tableName, tableAlias, map, paramName, value);
}
