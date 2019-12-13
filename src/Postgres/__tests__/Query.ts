import { ColumnMap } from '@zeroconf/libsql/ColumnMapper/ColumnMap';
import { baseModelGenerator } from '@zeroconf/libsql/Model';
import { Query as sql } from '@zeroconf/libsql/Query';
import { PostgresEscaper, PostgresPlatform, PostgresPool } from '@zeroconf/libsql/Runtime/Postgres';
import { param } from '@zeroconf/libsql/Select/Param';

describe('Postgres.Query', () => {
    let pool: PostgresPool;
    let platform: PostgresPlatform;
    afterAll(() => {
        return pool == null ? Promise.resolve() : pool.close();
    });

    beforeAll(async () => {
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
        const client = await pool.connect();
        platform = new PostgresPlatform(client, new PostgresEscaper());
    });

    describe('Select', () => {
        const profileColumnMap: ColumnMap = {
            birthdate: 'birthdate',
            email: 'email',
            id: 'id',
            name: 'name',
        };
        interface ProfileData {
            birthdate: Date | null;
            email: string;
            id: number;
            name: string;
        }

        const ProfileModelBase = baseModelGenerator<ProfileData>('Profile', profileColumnMap);
        class ProfileModel extends ProfileModelBase {
            public birthdate: Date | null;
            public email: string;
            public id: number;
            public name: string;
            public constructor(data: ProfileData) {
                super();
                this.birthdate = data.birthdate || null;
                this.email = data.email;
                this.id = data.id;
                this.name = data.name;
            }
        }

        beforeEach(async () => {
            await platform.client.query(`
                DROP TABLE IF EXISTS public.profiles
            `);

            await platform.client.query(`
                CREATE TABLE public.profiles (
                    id SERIAL PRIMARY KEY,
                    name text NOT NULL,
                    email text NOT NULL,
                    birthdate date,
                    UNIQUE (email)
                )
            `);

            await platform.client.query(`
                INSERT INTO
                    public.profiles (
                        id, name, email, birthdate
                    )
                VALUES
                    (1, 'Test 1', 'test1@example.com', NULL),
                    (2, 'Test 2', 'test2@example.com', '1990-01-01'),
                    (3, 'Test 3', 'test3@example.com', '1960-03-28')
            `);
        });

        test('Selecting a single profile', async () => {
            const idParam = param('id', 1);
            const result = await sql`
                SELECT
                    ${ProfileModel.columnSelect('p')}
                FROM
                    public.profiles p
                WHERE
                    p.id = ${idParam}
            `.singleResult(platform);
            const profile = new ProfileModel(result);

            expect(profile.id).toBe(1);
            expect(profile.email).toBe('test1@example.com');
            expect(profile.name).toBe('Test 1');
            expect(profile.birthdate).toBeNull();
        });

        test('Selecting non-existing profile throws', () => {
            const idParam = param('id', 0);
            return expect(
                sql`
                SELECT
                    ${ProfileModel.columnSelect('p')}
                FROM
                    public.profiles p
                WHERE
                    p.id = ${idParam}
            `.singleResult(platform),
            ).rejects.toMatchInlineSnapshot(
                `[Error: No results were found for the query. One or more results were expected.]`,
            );
        });

        test('Selection a single profile with complex adapter', async () => {
            const idParam = param('id', 2);
            const result = await sql`
                SELECT
                    ${ProfileModel.columnSelect('p')}
                FROM
                    public.profiles p
                WHERE
                    p.id = ${idParam}
            `.singleResult(platform);
            const profile = new ProfileModel(result);

            expect(profile.id).toBe(2);
            expect(profile.email).toBe('test2@example.com');
            expect(profile.name).toBe('Test 2');
            expect(profile.birthdate).toBeInstanceOf(Date);
            expect(profile.birthdate!.toISOString()).toBe('1990-01-01T00:00:00.000Z');
        });
    });
});
