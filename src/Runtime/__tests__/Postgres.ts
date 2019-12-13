import { PostgresEscaper, PostgresPool } from '@zeroconf/libsql/Runtime/Postgres';

describe('PostgresClient', () => {
    let pool: PostgresPool;
    afterAll(() => {
        return pool == null ? Promise.resolve() : pool.close();
    });

    beforeAll(() => {
        pool = new PostgresPool(
            'test',
            {
                database: 'test',
                host: 'postgres',
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
                'test',
                {
                    database: 'test-non-existing',
                    host: 'postgres',
                    password: 'test',
                    user: 'test',
                },
                10,
            );

            return expect(pool2.connect()).rejects.toThrowErrorMatchingInlineSnapshot(
                `"database \\"test-non-existing\\" does not exist"`,
            );
        });

        test('Connection against non existing host throws', () => {
            const pool2 = new PostgresPool(
                'test',
                {
                    database: 'test',
                    host: 'non-existing-host',
                    password: 'test',
                    user: 'test',
                },
                10,
            );

            return expect(pool2.connect()).rejects.toThrowError();
        });

        test('Connection with invalid credentials throws', () => {
            const pool2 = new PostgresPool(
                'test',
                {
                    database: 'test',
                    host: 'postgres',
                    password: 'test2',
                    user: 'test',
                },
                10,
            );

            return expect(pool2.connect()).rejects.toThrowErrorMatchingInlineSnapshot(
                `"password authentication failed for user \\"test\\""`,
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
