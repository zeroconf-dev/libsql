import { ColumnMap } from './ColumnMap';
import { mapPrefixedOutputColumnSqlExpr } from './MapPrefixedOutputColumnSqlExpr';
import { escapeIdent } from './EscapeIdent';
import { isForeignTable } from './IsForeignTable';

export function mapSqlSelect(alias: string | null, columnMap: ColumnMap, prefix: string): string {
    const properties = Object.keys(columnMap).filter(e => !isForeignTable(columnMap[e]));
    const sqlPrefix = alias == null ? '' : `${escapeIdent(alias)}.`;

    return properties
        .map(prop => {
            const res = columnMap[prop];
            const selectExpr = mapPrefixedOutputColumnSqlExpr(sqlPrefix, res);
            return `${selectExpr} as ${escapeIdent(prefix + prop)}`;
        })
        .join(', ');
}
