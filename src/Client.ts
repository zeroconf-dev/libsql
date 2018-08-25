interface QueryResultBase {
    command: string;
    rowCount: number;
}

export interface QueryResult extends QueryResultBase {
    rows: any[];
}

export interface QueryArrayResult extends QueryResultBase {
    rows: any[][];
}

export interface Client<T> {
    readonly transactionIsolationLevel: number;
    beginTransaction(): Promise<void>;
    close(): void;
    closeAsync(): Promise<void>;
    commit(): Promise<void>;
    getTransactionUniqueNumber(): number;
    getUnderlyingClient(): T;
    query(sql: string, parameters?: any[], name?: string): Promise<QueryResult>;
    rollback(): Promise<void>;
}
