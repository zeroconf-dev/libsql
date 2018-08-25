import { ColumnMap } from './ColumnMap';
import { escapeIdent } from './EscapeIdent';
import { mapPrefixedOutputColumnSqlExpr } from './MapPrefixedOutputColumnSqlExpr';
import { getForeignTableName } from './GetForeignTableName';

export function mapForeignSqlSelect(
    tableName: string,
    tableAlias: string,
    columnMap: ColumnMap,
    prefix: string,
): string {
    const properties = Object.keys(columnMap).filter(e => getForeignTableName(columnMap[e]) === tableName);
    const sqlPrefix = tableAlias == null ? '' : `${escapeIdent(tableAlias)}.`;

    return properties
        .map(prop => {
            const res = columnMap[prop];
            const selectExpr = mapPrefixedOutputColumnSqlExpr(sqlPrefix, res);

            return `${selectExpr} as ${escapeIdent(prefix + prop)}`;
        })
        .join(', ');
}
