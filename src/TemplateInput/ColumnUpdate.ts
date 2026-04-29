import type { ColumnMap } from '@zeroconf/libsql/ColumnMapper/ColumnMap.js';
import type { Escaper } from '@zeroconf/libsql/Runtime/Escaper.js';
import { getColumnInputExpr } from '@zeroconf/libsql/Util/GetColumnInputExpr.js';
import { getColumnName } from '@zeroconf/libsql/Util/GetColumnName.js';
import { isForeignTable } from '@zeroconf/libsql/Util/IsForeignTable.js';
import { isReadOnly } from '@zeroconf/libsql/Util/IsReadOnly.js';
import { mapInputValue } from '@zeroconf/libsql/Util/MapInputValue.js';
import { prefixParamName } from '@zeroconf/libsql/Util/PrefixParamName.js';

export class ColumnUpdate {
    public constructor(
        private readonly map: ColumnMap,
        private readonly paramName: string,
        private readonly value: any,
    ) {}

    public getSql(escape: Escaper, addParam: (paramName: string, value: any) => string): string {
        return Object.keys(this.map)
            .filter(column => !(isReadOnly(this.map[column]!) || isForeignTable(this.map[column]!)))
            .map(column => {
                const columnMap = this.map[column]!;
                const columnName = escape.identifier(getColumnName(columnMap));
                const paramValue = mapInputValue(columnMap, this.value[column]);
                const paramName = addParam(prefixParamName(this.paramName, column), paramValue);
                const value = getColumnInputExpr(columnMap, paramName);

                return `${columnName} = ${value}`;
            })
            .join(',\n\t\t');
    }
}
