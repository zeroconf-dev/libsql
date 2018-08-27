import { ColumnMapper } from './ColumnMapper';

export interface ColumnMap {
    [column: string]: string | ColumnMapper;
}
