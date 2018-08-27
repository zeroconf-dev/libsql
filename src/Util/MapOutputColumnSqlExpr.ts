import { ColumnMapper } from '../ColumnMapper/ColumnMapper';
import { mapPrefixedOutputColumnSqlExpr } from './MapPrefixedOutputColumnSqlExpr';
import { Escaper } from '../Runtime/Escaper';

export function mapOutputColumnSqlExpr(escape: Escaper, prefix: string, columnMapDescription: string | ColumnMapper) {
    return mapPrefixedOutputColumnSqlExpr(escape, `${escape.identifier(prefix)}.`, columnMapDescription);
}
