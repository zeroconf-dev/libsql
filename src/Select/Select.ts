import { ColumnMap } from '../ColumnMapper/ColumnMap';
import { ColumnSelect } from '../TemplateInput/ColumnSelect';

export function select<T>(tableAlias: string, map: ColumnMap, prefix: string = ''): ColumnSelect<T> {
    return new ColumnSelect<T>(tableAlias, map, prefix);
}
