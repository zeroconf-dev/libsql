import { Client, QueryResult } from '@zeroconf/libsql/Runtime/Client';

export class MockClient implements Client<any> {
    private result: QueryResult | null = null;
    public readonly transactionNestingLevel: number = 0;
    public beginTransaction(): Promise<void> {
        return Promise.resolve();
    }
    public close(): void {
        return;
    }
    public closeAsync(): Promise<void> {
        return Promise.resolve();
    }
    public commit(): Promise<void> {
        return Promise.resolve();
    }
    public getTransactionUniqueNumber(): number {
        return 0;
    }
    public getUnderlyingClient() {
        return null;
    }
    public query(_sql: string, _parameters?: any[] | undefined, _name?: string | undefined): Promise<QueryResult> {
        if (this.result == null) {
            throw new Error('QueryResult is not set');
        }
        return Promise.resolve(this.result);
    }
    public rollback(): Promise<void> {
        return Promise.resolve();
    }
    public setResult(result: QueryResult | null) {
        this.result = result;
    }
}
