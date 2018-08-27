import { ColumnMap } from '../ColumnMapper/ColumnMap';
import { ForeignColumnSelect } from '../TemplateInput/ForeignColumnSelect';

export function foreignSelectNoPrefix<T>(tableName: string, map: ColumnMap): ForeignColumnSelect<T> {
    return new ForeignColumnSelect<T>(tableName, null, map);
}
