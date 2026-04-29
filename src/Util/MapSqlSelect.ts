import type { ColumnMap } from '@zeroconf/libsql/ColumnMapper/ColumnMap.js';
import type { Escaper } from '@zeroconf/libsql/Runtime/Escaper.js';
import { isForeignTable } from '@zeroconf/libsql/Util/IsForeignTable.js';
import { mapPrefixedOutputColumnSqlExpr } from '@zeroconf/libsql/Util/MapPrefixedOutputColumnSqlExpr.js';

export function mapSqlSelect(escape: Escaper, alias: string | null, columnMap: ColumnMap, prefix: string): string {
    const properties = Object.keys(columnMap).filter(e => !isForeignTable(columnMap[e]!));
    const sqlPrefix = alias == null ? '' : `${escape.identifier(alias)}.`;

    return properties
        .map(prop => {
            const res = columnMap[prop]!;
            const selectExpr = mapPrefixedOutputColumnSqlExpr(escape, sqlPrefix, res);
            return `${selectExpr} as ${escape.identifier(prefix + prop)}`;
        })
        .join(', ');
}
