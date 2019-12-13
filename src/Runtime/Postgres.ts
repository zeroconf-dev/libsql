import { SqlQueryError } from '@zeroconf/libsql/Error/SqlQueryError';
import { Client, QueryResult } from '@zeroconf/libsql/Runtime/Client';
import { Escaper } from '@zeroconf/libsql/Runtime/Escaper';
import { Platform } from '@zeroconf/libsql/Runtime/Platform';
import * as pg from 'pg';
import * as escape from 'pg-escape';

const BEGIN_TRANSACTION_QUERY = 'BEGIN';
const COMMIT_TRANSACTION_QUERY = 'COMMIT';
const ROLLBACK_TRANSACTION_QUERY = 'ROLLBACK';

export class PostgresClient implements Client<pg.PoolClient> {
    public get transactionNestingLevel(): number {
        return this.numTransactionNestingLevel;
    }
    private client: pg.PoolClient | null;
    private numTransactionNestingLevel = 0;
    private uniqueIdentifierNumber = 0;

    public constructor(client: pg.PoolClient, private done: () => void) {
        this.client = client;
    }

    public beginTransaction(): Promise<void> {
        return this.query(BEGIN_TRANSACTION_QUERY) as Promise<any>;
    }

    public close(): void {
        this.closeAsync().catch(e => {
            // tslint:disable-next-line:no-console
            console.error(e);
            process.exit(1);
        });
    }

    public async closeAsync(): Promise<void> {
        while (this.numTransactionNestingLevel > 0) {
            await this.rollback();
        }
        this.done();
        this.client = null;
    }

    public commit(): Promise<void> {
        return this.query(COMMIT_TRANSACTION_QUERY) as Promise<any>;
    }

    public getTransactionUniqueNumber(): number {
        return this.uniqueIdentifierNumber++;
    }

    public getUnderlyingClient(): pg.PoolClient {
        if (this.client == null) {
            throw new Error('Disconnected');
        }
        return this.client;
    }

    public async query(sql: string, parameters?: any[], name?: string): Promise<QueryResult> {
        try {
            const client = this.getUnderlyingClient();
            if (parameters != null) {
                return name == null
                    ? client.query(sql, parameters)
                    : client.query({
                          name: name,
                          text: sql,
                          values: parameters,
                      });
            } else {
                const res = await client.query(sql);
                if (sql === BEGIN_TRANSACTION_QUERY) {
                    this.numTransactionNestingLevel++;
                } else if (sql === COMMIT_TRANSACTION_QUERY || sql === ROLLBACK_TRANSACTION_QUERY) {
                    this.numTransactionNestingLevel--;
                }
                return res;
            }
        } catch (e) {
            throw new SqlQueryError(e, sql, parameters || null);
        }
    }

    public rollback(): Promise<void> {
        return this.query(ROLLBACK_TRANSACTION_QUERY) as Promise<any>;
    }
}

export class PostgresPool {
    private activeConnections: Set<PostgresClient>;
    private pool: pg.Pool;
    public constructor(
        applicationName: string,
        config: Omit<pg.PoolConfig, 'application_name' | 'max'>,
        maxConnections?: number,
    ) {
        const pgConfig: pg.PoolConfig = {
            ...config,
            application_name: applicationName,
            max: maxConnections,
        };
        this.pool = new pg.Pool(pgConfig);
        this.activeConnections = new Set();
    }

    public async close(): Promise<void> {
        await Promise.all(Array.from(this.activeConnections.values()).map(client => client.closeAsync()));
        await this.pool.end();
        this.pool = null as any;
    }

    public connect(): Promise<PostgresClient> {
        return new Promise((resolve, reject) => {
            this.pool.connect().then(
                pgClient => {
                    const client: PostgresClient = new PostgresClient(pgClient, () => {
                        this.activeConnections.delete(client);
                        pgClient.release(true as any);
                    });
                    this.activeConnections.add(client);
                    resolve(client);
                },
                error => {
                    reject(error);
                },
            );
        });
    }

    public getActiveCount() {
        return this.activeConnections.size;
    }
}

function forceEscapeIdentifier(ident: string): string {
    const res = escape.ident(ident);
    if (ident.indexOf('"') === -1) {
        return `"${ident}"`;
    }
    return res;
}

export class PostgresEscaper implements Escaper {
    public identifier(ident: string): string {
        if (/[A-Z]/.test(ident)) {
            return forceEscapeIdentifier(ident);
        }
        return escape.ident(ident);
    }
}

export class PostgresPlatform extends Platform<PostgresClient> {
    public constructor(client: PostgresClient, escaper: PostgresEscaper) {
        super(client, escaper);
    }
}
