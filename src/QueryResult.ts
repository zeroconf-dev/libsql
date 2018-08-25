export interface QueryResult<T> {
    affectedRows: number;
    rows: T[];
}
