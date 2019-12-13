import { ColumnMap } from '@zeroconf/libsql/ColumnMapper/ColumnMap';
import { ColumnChanged } from '@zeroconf/libsql/TemplateInput/ColumnChanged';

export function changed(tableAlias: string, map: ColumnMap, paramName: string, value: any): ColumnChanged {
    return new ColumnChanged(tableAlias, map, paramName, value);
}
