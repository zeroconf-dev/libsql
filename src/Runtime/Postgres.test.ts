import { PostgresEscaper, PostgresPool } from '@zeroconf/libsql/Runtime/Postgres.js';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            readonly DATABASE_RUNNING?: 'true';
            /**
             * docker-compose binds/exposes the postgres database port to localhost
             * when running the tests within the docker-compose setup, use the container link name as host (postgres).
             */
            readonly PGHOST?: 'localhost' | 'postgres';
        }
    }
}

describe(/*.runIf(process.env.DATABASE_RUNNING === 'true')*/ 'PostgresClient', () => {
    let pool: PostgresPool;
    afterAll(() => {
        return pool == null ? Promise.resolve() : pool.close();
    });

    beforeAll(() => {
        pool = new PostgresPool(
            'vitest',
            {
                database: 'test',
                host: process.env.PGHOST ?? 'localhost',
                password: 'test',
                user: 'test',
            },
            10,
        );
    });

    describe('connect', () => {
        test('Connection is established successfully', () => {
            return expect(pool.connect()).resolves.toBeTruthy();
        });

        test('Connection against non existing database throws', () => {
            const pool2 = new PostgresPool(
                'vitest',
                {
                    database: 'test-non-existing',
                    host: process.env.PGHOST ?? 'localhost',
                    password: 'test',
                    user: 'test',
                },
                10,
            );

            return expect(pool2.connect()).rejects.toThrowErrorMatchingInlineSnapshot(
                `[error: database "test-non-existing" does not exist]`,
            );
        });

        test('Connection against non existing host throws', () => {
            const pool2 = new PostgresPool(
                'vitest',
                {
                    database: 'test',
                    host: 'non-existing-host',
                    password: 'test',
                    user: 'test',
                    connectionTimeoutMillis: 50,
                },
                10,
            );

            return expect(pool2.connect()).rejects.toThrowError();
        });

        test('Connection with invalid credentials throws', () => {
            const pool2 = new PostgresPool(
                'vitest',
                {
                    database: 'test',
                    host: process.env.PGHOST ?? 'localhost',
                    password: 'test2',
                    user: 'test',
                },
                10,
            );

            return expect(pool2.connect()).rejects.toThrowErrorMatchingInlineSnapshot(
                `[error: password authentication failed for user "test"]`,
            );
        });
    });

    describe('query', () => {
        test('Simple query result', async () => {
            const client = await pool.connect();
            return expect(client.query('SELECT 1 as "value"')).resolves.toMatchObject({
                command: 'SELECT',
                rowCount: 1,
                rows: [{ value: 1 }],
            });
        });

        test('Syntax error throws', async () => {
            const client = await pool.connect();
            return expect(client.query('SELECT ,;"')).rejects.toMatchInlineSnapshot(
                `[Error: syntax error at or near ","]`,
            );
        });
    });
});

describe('PostgresEscaper', () => {
    const escape = new PostgresEscaper();

    describe('identifier', () => {
        test('lower case non keywords is not escaped', () => {
            expect(escape.identifier('test')).toBe('test');
        });

        test('lower case keyword is force escaped', () => {
            expect(escape.identifier('from')).toBe('"from"');
        });

        test('identifiers containing capital letters is force escaped', () => {
            expect(escape.identifier('lowerUPPER')).toBe('"lowerUPPER"');
        });
    });
});
