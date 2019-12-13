import { InputColumnMapper } from '@zeroconf/libsql/ColumnMapper/InputColumnMapper';
import { OutputColumnMapper } from '@zeroconf/libsql/ColumnMapper/OutputColumnMapper';

export interface ColumnMapper {
    columnName: string;
    foreignTableName?: string;
    input?: InputColumnMapper;
    output?: OutputColumnMapper;
    readOnly?: boolean;
}
