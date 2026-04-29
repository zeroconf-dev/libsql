import type { ColumnMap } from '@zeroconf/libsql/ColumnMapper/ColumnMap.js';
import { changed } from '@zeroconf/libsql/Select/Changed.js';
import { foreignChanged } from '@zeroconf/libsql/Select/ForeignChanged.js';
import { foreignSelect } from '@zeroconf/libsql/Select/ForeignSelect.js';
import { foreignSelectNoPrefix } from '@zeroconf/libsql/Select/ForeignSelectNoPrefix.js';
import { foreignUpdate } from '@zeroconf/libsql/Select/ForeignUpdate.js';
import { select } from '@zeroconf/libsql/Select/Select.js';
import { selectNoPrefix } from '@zeroconf/libsql/Select/SelectNoPrefix.js';
import { update } from '@zeroconf/libsql/Select/Update.js';
import type { ColumnChanged } from '@zeroconf/libsql/TemplateInput/ColumnChanged.js';
import type { ColumnSelect } from '@zeroconf/libsql/TemplateInput/ColumnSelect.js';
import type { ColumnUpdate } from '@zeroconf/libsql/TemplateInput/ColumnUpdate.js';
import type { ForeignColumnChanged } from '@zeroconf/libsql/TemplateInput/ForeignColumnChanged.js';
import type { ForeignColumnSelect } from '@zeroconf/libsql/TemplateInput/ForeignColumnSelect.js';
import type { ForeignColumnUpdate } from '@zeroconf/libsql/TemplateInput/ForeignColumnUpdate.js';

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
        const mapped = columnMap[columnName]!;
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
