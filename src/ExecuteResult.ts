import { QueryResult } from './QueryResult';

export interface ExecuteResult<T> {
    params: any[];
    result: QueryResult<T>;
    sql: string;
}
