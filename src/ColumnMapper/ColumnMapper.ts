import { InputColumnMapper } from './InputColumnMapper';
import { OutputColumnMapper } from './OutputColumnMapper';

export interface ColumnMapper {
    columnName: string;
    foreignTableName?: string;
    input?: InputColumnMapper;
    output?: OutputColumnMapper;
    readOnly?: boolean;
}
