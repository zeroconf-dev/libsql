import { ColumnMap } from '@zeroconf/libsql/ColumnMapper/ColumnMap';
import { ForeignColumnUpdate } from '@zeroconf/libsql/TemplateInput/ForeignColumnUpdate';

export function foreignUpdate(tableName: string, map: ColumnMap, paramName: string, value: any): ForeignColumnUpdate {
    return new ForeignColumnUpdate(tableName, map, paramName, value);
}
