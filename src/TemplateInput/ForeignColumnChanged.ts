import { ColumnMap } from '@zeroconf/libsql/ColumnMapper/ColumnMap';
import { Escaper } from '@zeroconf/libsql/Runtime/Escaper';
import { getColumnInputExpr } from '@zeroconf/libsql/Util/GetColumnInputExpr';
import { getForeignTableName } from '@zeroconf/libsql/Util/GetForeignTableName';
import { isReadOnly } from '@zeroconf/libsql/Util/IsReadOnly';
import { mapInputValue } from '@zeroconf/libsql/Util/MapInputValue';
import { mapOutputColumnSqlExpr } from '@zeroconf/libsql/Util/MapOutputColumnSqlExpr';
import { prefixParamName } from '@zeroconf/libsql/Util/PrefixParamName';

export class ForeignColumnChanged {
    public constructor(
        private readonly tableName: string,
        private readonly tableAlias: string,
        private readonly map: ColumnMap,
        private readonly paramName: string,
        private readonly value: any,
    ) {}

    public getSql(escape: Escaper, addParam: (paramName: string, value: any) => string): string {
        const res = Object.keys(this.map)
            .filter(column => !isReadOnly(this.map[column]) && getForeignTableName(this.map[column]) === this.tableName)
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
