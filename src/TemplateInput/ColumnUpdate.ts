import { ColumnMap } from '@zeroconf/libsql/ColumnMapper/ColumnMap';
import { Escaper } from '@zeroconf/libsql/Runtime/Escaper';
import { getColumnInputExpr } from '@zeroconf/libsql/Util/GetColumnInputExpr';
import { getColumnName } from '@zeroconf/libsql/Util/GetColumnName';
import { isForeignTable } from '@zeroconf/libsql/Util/IsForeignTable';
import { isReadOnly } from '@zeroconf/libsql/Util/IsReadOnly';
import { mapInputValue } from '@zeroconf/libsql/Util/MapInputValue';
import { prefixParamName } from '@zeroconf/libsql/Util/PrefixParamName';

export class ColumnUpdate {
    public constructor(
        private readonly map: ColumnMap,
        private readonly paramName: string,
        private readonly value: any,
    ) {}

    public getSql(escape: Escaper, addParam: (paramName: string, value: any) => string): string {
        return Object.keys(this.map)
            .filter(column => !(isReadOnly(this.map[column]) || isForeignTable(this.map[column])))
            .map(column => {
                const columnMap = this.map[column];
                const columnName = escape.identifier(getColumnName(columnMap));
                const paramValue = mapInputValue(columnMap, this.value[column]);
                const paramName = addParam(prefixParamName(this.paramName, column), paramValue);
                const value = getColumnInputExpr(columnMap, paramName);

                return `${columnName} = ${value}`;
            })
            .join(',\n\t\t');
    }
}
