import { ColumnMap } from './ColumnMap';
import { isReadOnly } from './IsReadOnly';
import { isForeignTable } from './IsForeignTable';
import { mapInputValue } from './MapInputValue';
import { prefixParamName } from './PrefixParamName';
import { getColumnInputExpr } from './GetColumnInputExpr';
import { mapOutputColumnSqlExpr } from './MapOutputColumnSqlExpr';

export class ColumnChanged {
    public constructor(
        private readonly tableAlias: string,
        private readonly map: ColumnMap,
        private readonly paramName: string,
        private readonly value: any,
    ) {}

    public getSql(addParam: (paramName: string, value: any) => string): string {
        const res = Object.keys(this.map)
            .filter(column => !(isReadOnly(this.map[column]) || isForeignTable(this.map[column])))
            .map(column => {
                const columnMap = this.map[column];
                const columnName = mapOutputColumnSqlExpr(this.tableAlias, columnMap);
                const paramValue = mapInputValue(columnMap, this.value[column]);
                const paramName = addParam(prefixParamName(this.paramName, column), paramValue);
                const value = getColumnInputExpr(columnMap, paramName);

                return `${columnName} IS DISTINCT FROM ${value}`;
            });

        return `(${res.join(' OR ')})`;
    }
}
