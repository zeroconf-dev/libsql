import { ColumnMap } from '../ColumnMapper/ColumnMap';
import { ColumnSelect } from '../TemplateInput/ColumnSelect';

export function selectNoPrefix<T>(map: ColumnMap): ColumnSelect<T> {
    return new ColumnSelect<T>(null, map);
}
