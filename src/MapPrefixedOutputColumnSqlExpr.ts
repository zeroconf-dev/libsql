import { ColumnMapper } from './ColumnMapper';
import { escapeIdent } from './EscapeIdent';

export function mapPrefixedOutputColumnSqlExpr(prefix: string, columnMapDescription: string | ColumnMapper) {
    if (typeof columnMapDescription === 'string') {
        return prefix + escapeIdent(columnMapDescription);
    }
    if (columnMapDescription.output === undefined) {
        return prefix + escapeIdent(columnMapDescription.columnName);
    }
    const output = columnMapDescription.output;
    const fn = typeof output === 'function' ? output : output.sqlExpr;
    return fn(prefix);
}
