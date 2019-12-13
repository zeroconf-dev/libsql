import { ColumnMap } from '@zeroconf/libsql/ColumnMapper/ColumnMap';
import { changed } from '@zeroconf/libsql/Select/Changed';
import { foreignChanged } from '@zeroconf/libsql/Select/ForeignChanged';
import { foreignSelect } from '@zeroconf/libsql/Select/ForeignSelect';
import { foreignSelectNoPrefix } from '@zeroconf/libsql/Select/ForeignSelectNoPrefix';
import { foreignUpdate } from '@zeroconf/libsql/Select/ForeignUpdate';
import { select } from '@zeroconf/libsql/Select/Select';
import { selectNoPrefix } from '@zeroconf/libsql/Select/SelectNoPrefix';
import { update } from '@zeroconf/libsql/Select/Update';
import { ColumnChanged } from '@zeroconf/libsql/TemplateInput/ColumnChanged';
import { ColumnSelect } from '@zeroconf/libsql/TemplateInput/ColumnSelect';
import { ColumnUpdate } from '@zeroconf/libsql/TemplateInput/ColumnUpdate';
import { ForeignColumnChanged } from '@zeroconf/libsql/TemplateInput/ForeignColumnChanged';
import { ForeignColumnSelect } from '@zeroconf/libsql/TemplateInput/ForeignColumnSelect';
import { ForeignColumnUpdate } from '@zeroconf/libsql/TemplateInput/ForeignColumnUpdate';

export type Model<TData> = ModelInterface<TData> & TData;

interface ModelInterface<TData> {
    columnChanged(paramName: string, tableAlias: string): ColumnChanged;
    columnUpdate(paramName: string): ColumnUpdate;
    foreignColumnChanged(foreignTableName: string, tableAlias: string, paramName: string): ForeignColumnChanged;
    foreignColumnUpdate(foreignTableName: string, paramName: string): ForeignColumnUpdate;
    updateWithData(data: TData): void;
}

export interface ModelConstructor<TData> {
    readonly TypeName: string;
    new (data: TData): Model<TData>;

    columnSelect(tableAlias: string, prefix?: string): ColumnSelect<TData>;
    foreignColumnSelect(foreignTableName: string, tableAlias: string, prefix?: string): ForeignColumnSelect<TData>;
    foreignInsertReturning(foreignTableName: string): ForeignColumnSelect<TData>;
    foreignOutputReselect(foreignTableName: string, tableAlias: string, prefix?: string): ForeignColumnSelect<TData>;
    insertReturning(): ColumnSelect<TData>;
    outputReselect(tableAlias: string, prefix?: string): ColumnSelect<TData>;
}

export function baseModelGenerator<TData>(name: string, columnMap: ColumnMap) {
    const reselectColumnMap = Object.keys(columnMap).reduce((carry, columnName) => {
        const mapped = columnMap[columnName];
        carry[columnName] = {
            columnName: columnName,
            foreignTableName: typeof mapped === 'string' ? undefined : mapped.foreignTableName,
        };
        return carry;
    }, {} as ColumnMap);
    Object.freeze(reselectColumnMap);

    return class implements ModelInterface<TData> {
        public static columnSelect(tableAlias: string, prefix?: string | undefined): ColumnSelect<TData> {
            return select<TData>(tableAlias, columnMap, prefix);
        }

        public static foreignColumnSelect(
            foreignTableName: string,
            tableAlias: string,
            prefix?: string | undefined,
        ): ForeignColumnSelect<TData> {
            return foreignSelect<TData>(foreignTableName, tableAlias, columnMap, prefix);
        }

        public static foreignInsertReturning(foreignTableName: string): ForeignColumnSelect<TData> {
            return foreignSelectNoPrefix<TData>(foreignTableName, columnMap);
        }

        public static foreignOutputReselect(
            foreignTableName: string,
            tableAlias: string,
            prefix?: string | undefined,
        ): ForeignColumnSelect<TData> {
            return foreignSelect<TData>(foreignTableName, tableAlias, columnMap, prefix);
        }

        public static insertReturning(): ColumnSelect<TData> {
            return selectNoPrefix<TData>(columnMap);
        }

        public static outputReselect(tableAlias: string, prefix?: string | undefined): ColumnSelect<TData> {
            return select<TData>(tableAlias, columnMap, prefix);
        }

        public columnChanged(paramName: string, tableAlias: string): ColumnChanged {
            return changed(tableAlias, columnMap, paramName, this);
        }

        public columnUpdate(paramName: string): ColumnUpdate {
            return update(columnMap, paramName, this);
        }

        public foreignColumnChanged(
            foreignTableName: string,
            tableAlias: string,
            paramName: string,
        ): ForeignColumnChanged {
            return foreignChanged(foreignTableName, tableAlias, columnMap, paramName, this);
        }

        public foreignColumnUpdate(foreignTableName: string, paramName: string): ForeignColumnUpdate {
            return foreignUpdate(foreignTableName, columnMap, paramName, this);
        }

        public updateWithData(data: TData): void {
            Object.assign(this, data);
        }

        public static get TypeName() {
            return name;
        }
    };
}
