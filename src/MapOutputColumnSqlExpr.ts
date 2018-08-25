import { ColumnMapper } from './ColumnMapper';
import { mapPrefixedOutputColumnSqlExpr } from './MapPrefixedOutputColumnSqlExpr';
import { escapeIdent } from './EscapeIdent';

export function mapOutputColumnSqlExpr(prefix: string, columnMapDescription: string | ColumnMapper) {
    return mapPrefixedOutputColumnSqlExpr(`${escapeIdent(prefix)}.`, columnMapDescription);
}
