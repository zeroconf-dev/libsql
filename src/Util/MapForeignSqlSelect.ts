import type { ColumnMap } from '@zeroconf/libsql/ColumnMapper/ColumnMap.js';
import type { Escaper } from '@zeroconf/libsql/Runtime/Escaper.js';
import { getForeignTableName } from '@zeroconf/libsql/Util/GetForeignTableName.js';
import { mapPrefixedOutputColumnSqlExpr } from '@zeroconf/libsql/Util/MapPrefixedOutputColumnSqlExpr.js';

export function mapForeignSqlSelect(
    escape: Escaper,
    tableName: string,
    tableAlias: string,
    columnMap: ColumnMap,
    prefix: string,
): string {
    const properties = Object.keys(columnMap).filter(e => getForeignTableName(columnMap[e]!) === tableName);
    const sqlPrefix = tableAlias == null ? '' : `${escape.identifier(tableAlias)}.`;

    return properties
        .map(prop => {
            const res = columnMap[prop]!;
            const selectExpr = mapPrefixedOutputColumnSqlExpr(escape, sqlPrefix, res);

            return `${selectExpr} as ${escape.identifier(prefix + prop)}`;
        })
        .join(', ');
}
