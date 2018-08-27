import { ColumnMap } from '../ColumnMapper/ColumnMap';
import { baseModelGenerator } from '../Model';
import { Query as sql } from '../Query';
import { MockClient } from '../Runtime/__mocks__/Client';
import { mockEscaper } from '../Runtime/__mocks__/Escaper';
import { MockPlatform } from '../Runtime/__mocks__/Platform';
import { param } from '../Select/Param';

const client = new MockClient();
const platform = new MockPlatform(client, mockEscaper);

describe('Query', () => {
    beforeEach(() => {
        platform.client.setResult(null);
    });

    test('Simple model select', async () => {
        const userColumnMap: ColumnMap = {
            email: 'email',
            id: 'id',
            name: 'name',
        };

        interface UserData {
            email: string;
            id: number;
            name: string;
        }

        // tslint:disable-next-line:variable-name
        const UserModelBase = baseModelGenerator<UserData>('User', userColumnMap);
        class UserModel extends UserModelBase {
            public email: string;
            public id: number;
            public name: string;

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
                    email: 'test@example.com',
                    id: 1,
                    name: 'Test person',
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
