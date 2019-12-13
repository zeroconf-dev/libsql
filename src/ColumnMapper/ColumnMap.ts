import { ColumnMapper } from '@zeroconf/libsql/ColumnMapper';

export interface ColumnMap {
    [column: string]: string | ColumnMapper;
}
