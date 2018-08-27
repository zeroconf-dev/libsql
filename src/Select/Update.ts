import { ColumnMap } from '../ColumnMapper/ColumnMap';
import { ColumnUpdate } from '../TemplateInput/ColumnUpdate';

export function update(map: ColumnMap, paramName: string, value: any): ColumnUpdate {
    return new ColumnUpdate(map, paramName, value);
}
