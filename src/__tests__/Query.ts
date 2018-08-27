import { ColumnMap } from '../ColumnMapper/ColumnMap';
import { baseModelGenerator } from '../Model';
import { Query as sql } from '../Query';
import { param } from '../Select/Param';
import { MockClient } from '../Runtime/__mocks__/Client';
import { MockPlatform } from '../Runtime/__mocks__/Platform';
import { mockEscaper } from '../Runtime/__mocks__/Escaper';

const client = new MockClient();
const platform = new MockPlatform(client, mockEscaper);

describe('Query', () => {
    beforeEach(() => {
        platform.client.setResult(null);
    });

    test('Simple model select', async () => {
        const userColumnMap: ColumnMap = {
            id: 'id',
            name: 'name',
            email: 'email',
        };

        interface UserData {
            id: number;
            name: string;
            email: string;
        }

        const UserModelBase = baseModelGenerator<UserData>('User', userColumnMap);
        class UserModel extends UserModelBase {
            public id: number;
            public name: string;
            public email: string;

            public constructor(data: UserData) {
                super();
                this.id = data.id;
                this.name = data.name;
                this.email = data.email;
            }
        }

        const idParam = param('id', 1);
        const template = sql`
            SELECT
                ${UserModel.columnSelect('u')}
            FROM
                public.users u
            WHERE
                u.id = ${idParam}
        `;

        expect(template.getSql(platform)).toMatchSnapshot();

        client.setResult({
            command: 'SELECT',
            rowCount: 1,
            rows: [
                {
                    id: 1,
                    name: 'Test person',
                    email: 'test@example.com',
                },
            ],
        });

        const userResult = await template.singleResult(platform);
        const user = new UserModel(userResult);

        expect(user).toBeInstanceOf(UserModel);
        expect(user.id).toBe(1);
        expect(user.name).toBe('Test person');
        expect(user.email).toBe('test@example.com');
    });
});
