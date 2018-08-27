import { ColumnMapper } from '../ColumnMapper/ColumnMapper';
import { Escaper } from '../Runtime/Escaper';
import { mapPrefixedOutputColumnSqlExpr } from './MapPrefixedOutputColumnSqlExpr';

export function mapOutputColumnSqlExpr(escape: Escaper, prefix: string, columnMapDescription: string | ColumnMapper) {
    return mapPrefixedOutputColumnSqlExpr(escape, `${escape.identifier(prefix)}.`, columnMapDescription);
}
