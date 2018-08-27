import { ColumnMap } from '../ColumnMapper/ColumnMap';
import { isReadOnly } from '../Util/IsReadOnly';
import { isForeignTable } from '../Util/IsForeignTable';
import { mapInputValue } from '../Util/MapInputValue';
import { prefixParamName } from '../Util/PrefixParamName';
import { getColumnInputExpr } from '../Util/GetColumnInputExpr';
import { mapOutputColumnSqlExpr } from '../Util/MapOutputColumnSqlExpr';
import { Escaper } from '../Runtime/Escaper';

export class ColumnChanged {
    public constructor(
        private readonly tableAlias: string,
        private readonly map: ColumnMap,
        private readonly paramName: string,
        private readonly value: any,
    ) {}

    public getSql(escape: Escaper, addParam: (paramName: string, value: any) => string): string {
        const res = Object.keys(this.map)
            .filter(column => !(isReadOnly(this.map[column]) || isForeignTable(this.map[column])))
            .map(column => {
                const columnMap = this.map[column];
                const columnName = mapOutputColumnSqlExpr(escape, this.tableAlias, columnMap);
                const paramValue = mapInputValue(columnMap, this.value[column]);
                const paramName = addParam(prefixParamName(this.paramName, column), paramValue);
                const value = getColumnInputExpr(columnMap, paramName);

                return `${columnName} IS DISTINCT FROM ${value}`;
            });

        return `(${res.join(' OR ')})`;
    }
}
