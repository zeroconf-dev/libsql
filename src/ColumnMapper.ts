import type { InputColumnMapper } from '@zeroconf/libsql/ColumnMapper/InputColumnMapper.js';
import type { OutputColumnMapper } from '@zeroconf/libsql/ColumnMapper/OutputColumnMapper.js';

export interface ColumnMapper {
    columnName: string;
    foreignTableName?: string | undefined;
    input?: InputColumnMapper;
    output?: OutputColumnMapper;
    readOnly?: boolean;
}
