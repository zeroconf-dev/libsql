import { ColumnMapper } from '../ColumnMapper/ColumnMapper';

export function getColumnInputExpr(column: string | ColumnMapper, paramName: string): string {
    if (typeof column === 'string' || column.input === undefined) {
        return paramName;
    }

    if (typeof column.input === 'function') {
        return column.input(paramName);
    }

    return column.input.sqlExpr(paramName);
}
