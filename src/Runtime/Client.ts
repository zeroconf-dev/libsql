interface QueryResultBase {
    command: string;
    rowCount: number | null;
}

export interface QueryResultRow {
    [column: string]: any;
}

export interface QueryResult<R extends QueryResultRow = any> extends QueryResultBase {
    rows: R[];
}

export interface QueryArrayResult<R extends any[] = any[]> extends QueryResultBase {
    rows: R[];
}

export interface Client<T> {
    readonly transactionNestingLevel: number;
    beginTransaction(): Promise<void>;
    close(): void;
    closeAsync(): Promise<void>;
    commit(): Promise<void>;
    getTransactionUniqueNumber(): number;
    getUnderlyingClient(): T;
    query(sql: string, parameters?: any[], name?: string): Promise<QueryResult>;
    rollback(): Promise<void>;
}
