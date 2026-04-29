import type { ColumnMapper } from '@zeroconf/libsql/ColumnMapper.js';

export interface ColumnMap {
    [column: string]: string | ColumnMapper;
}
