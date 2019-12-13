import { ColumnMapper } from '@zeroconf/libsql/ColumnMapper';
import { Escaper } from '@zeroconf/libsql/Runtime/Escaper';
import { mapPrefixedOutputColumnSqlExpr } from '@zeroconf/libsql/Util/MapPrefixedOutputColumnSqlExpr';

export function mapOutputColumnSqlExpr(escape: Escaper, prefix: string, columnMapDescription: string | ColumnMapper) {
    return mapPrefixedOutputColumnSqlExpr(escape, `${escape.identifier(prefix)}.`, columnMapDescription);
}
