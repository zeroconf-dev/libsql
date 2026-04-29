import type { ColumnMapper } from '@zeroconf/libsql/ColumnMapper.js';
import type { Escaper } from '@zeroconf/libsql/Runtime/Escaper.js';
import { mapPrefixedOutputColumnSqlExpr } from '@zeroconf/libsql/Util/MapPrefixedOutputColumnSqlExpr.js';

export function mapOutputColumnSqlExpr(escape: Escaper, prefix: string, columnMapDescription: string | ColumnMapper) {
    return mapPrefixedOutputColumnSqlExpr(escape, `${escape.identifier(prefix)}.`, columnMapDescription);
}
