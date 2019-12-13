import { ColumnMap } from '@zeroconf/libsql/ColumnMapper/ColumnMap';
import { Escaper } from '@zeroconf/libsql/Runtime/Escaper';
import { isForeignTable } from '@zeroconf/libsql/Util/IsForeignTable';
import { mapPrefixedOutputColumnSqlExpr } from '@zeroconf/libsql/Util/MapPrefixedOutputColumnSqlExpr';

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
