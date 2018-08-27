import { ColumnMap } from '../ColumnMapper/ColumnMap';
import { mapPrefixedOutputColumnSqlExpr } from './MapPrefixedOutputColumnSqlExpr';
import { isForeignTable } from './IsForeignTable';
import { Escaper } from '../Runtime/Escaper';

export function mapSqlSelect(escape: Escaper, alias: string | null, columnMap: ColumnMap, prefix: string): string {
    const properties = Object.keys(columnMap).filter(e => !isForeignTable(columnMap[e]));
    const sqlPrefix = alias == null ? '' : `${escape.identifier(alias)}.`;

    return properties
        .map(prop => {
            const res = columnMap[prop];
            const selectExpr = mapPrefixedOutputColumnSqlExpr(escape, sqlPrefix, res);
            return `${selectExpr} as ${escape.identifier(prefix + prop)}`;
        })
        .join(', ');
}
