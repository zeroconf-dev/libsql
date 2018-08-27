import { ColumnMap } from '../ColumnMapper/ColumnMap';
import { ColumnChanged } from '../TemplateInput/ColumnChanged';

export function changed(tableAlias: string, map: ColumnMap, paramName: string, value: any): ColumnChanged {
    return new ColumnChanged(tableAlias, map, paramName, value);
}
