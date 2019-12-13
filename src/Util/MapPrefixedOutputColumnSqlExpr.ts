import { ColumnMapper } from '@zeroconf/libsql/ColumnMapper';
import { Escaper } from '@zeroconf/libsql/Runtime/Escaper';

export function mapPrefixedOutputColumnSqlExpr(
    escape: Escaper,
    prefix: string,
    columnMapDescription: string | ColumnMapper,
) {
    if (typeof columnMapDescription === 'string') {
        return prefix + escape.identifier(columnMapDescription);
    }
    if (columnMapDescription.output === undefined) {
        return prefix + escape.identifier(columnMapDescription.columnName);
    }
    const output = columnMapDescription.output;
    const fn = typeof output === 'function' ? output : output.sqlExpr;
    return fn(prefix);
}
