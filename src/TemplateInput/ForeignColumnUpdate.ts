import { ColumnMap } from '../ColumnMapper/ColumnMap';
import { Escaper } from '../Runtime/Escaper';
import { getColumnInputExpr } from '../Util/GetColumnInputExpr';
import { getColumnName } from '../Util/GetColumnName';
import { getForeignTableName } from '../Util/GetForeignTableName';
import { isReadOnly } from '../Util/IsReadOnly';
import { mapInputValue } from '../Util/MapInputValue';
import { prefixParamName } from '../Util/PrefixParamName';

export class ForeignColumnUpdate {
    public constructor(
        private readonly tableName: string,
        private readonly map: ColumnMap,
        private readonly paramName: string,
        private readonly value: any,
    ) {}

    public getSql(escape: Escaper, addParam: (paramName: string, value: any) => string): string {
        return Object.keys(this.map)
            .filter(column => !isReadOnly(this.map[column]) && getForeignTableName(this.map[column]) === this.tableName)
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
