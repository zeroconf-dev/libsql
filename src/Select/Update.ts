import { ColumnMap } from '@zeroconf/libsql/ColumnMapper/ColumnMap';
import { ColumnUpdate } from '@zeroconf/libsql/TemplateInput/ColumnUpdate';

export function update(map: ColumnMap, paramName: string, value: any): ColumnUpdate {
    return new ColumnUpdate(map, paramName, value);
}
