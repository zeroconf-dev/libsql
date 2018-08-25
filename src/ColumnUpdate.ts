import { ColumnMap } from './ColumnMap';
import { isReadOnly } from './isReadOnly';
import { isForeignTable } from './isForeignTable';
import { escapeIdent } from './EscapeIdent';
import { getColumnName } from './GetColumnName';
import { mapInputValue } from './MapInputValue';
import { prefixParamName } from './PrefixParamName';
import { getColumnInputExpr } from './GetColumnInputExpr';

export class ColumnUpdate {
    public constructor(
        private readonly map: ColumnMap,
        private readonly paramName: string,
        private readonly value: any,
    ) {}

    public getSql(addParam: (paramName: string, value: any) => string): string {
        return Object.keys(this.map)
            .filter(column => !(isReadOnly(this.map[column]) || isForeignTable(this.map[column])))
            .map(column => {
                const columnMap = this.map[column];
                const columnName = escapeIdent(getColumnName(columnMap));
                const paramValue = mapInputValue(columnMap, this.value[column]);
                const paramName = addParam(prefixParamName(this.paramName, column), paramValue);
                const value = getColumnInputExpr(columnMap, paramName);

                return `${columnName} = ${value}`;
            })
            .join(',\n\t\t');
    }
}
