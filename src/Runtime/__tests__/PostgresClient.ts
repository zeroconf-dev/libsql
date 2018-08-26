import { PostgresPool } from '../PostgresClient';

describe('PostgresClient', () => {
    let pool: PostgresPool;
    afterAll(() => {
        return pool == null ? Promise.resolve() : pool.close();
    });

    beforeAll(() => {
        pool = new PostgresPool('test');
    });
    test('Connect successfully', () => {
        return expect(pool.connect()).resolves.toBeTruthy();
    });

    test('Simple query result', async () => {
        const client = await pool.connect();
        return expect(client.query('SELECT 1 as "value"')).resolves.toMatchObject({
            command: 'SELECT',
            rowCount: 1,
            rows: [{ value: 1 }],
        });
    });
});
