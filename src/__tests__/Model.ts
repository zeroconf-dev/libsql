import { ColumnMap } from '@zeroconf/libsql/ColumnMapper/ColumnMap';
import { baseModelGenerator } from '@zeroconf/libsql/Model';
import { Escaper } from '@zeroconf/libsql/Runtime/Escaper';
import { ColumnSelect } from '@zeroconf/libsql/TemplateInput/ColumnSelect';

const escape: Escaper = {
    identifier: (ident: string) => `"${ident}"`,
};

describe('Model', () => {
    describe('baseModelGenerator', () => {
        test('can generate model with a simple column map', () => {
            const columnMap = {
                id: 'id',
            };

            interface ModelData {
                id: number;
            }

            const BaseModelWithId = baseModelGenerator<ModelData>('Model', columnMap);
            class ModelWithId extends BaseModelWithId {
                public id!: number;
                public constructor(data: ModelData) {
                    super();
                    this.id = data.id;
                }
            }

            const columnSelect = ModelWithId.insertReturning();

            expect(columnSelect).toBeInstanceOf(ColumnSelect);
            expect(columnSelect.getSql(escape)).toBe('"id" as "id"');
        });

        test('can generate model with a complex column map', () => {
            const columnMap: ColumnMap = {
                id: {
                    columnName: 'id2',
                },
            };

            interface ModelData {
                id: number;
            }

            const BaseModelWithId = baseModelGenerator<ModelData>('Model', columnMap);
            class ModelWithId extends BaseModelWithId {
                public id!: number;
                public constructor(data: ModelData) {
                    super();
                    this.id = data.id;
                }
            }

            const columnSelect = ModelWithId.insertReturning();

            expect(columnSelect).toBeInstanceOf(ColumnSelect);
            expect(columnSelect.getSql(escape)).toBe('"id2" as "id"');
        });
    });
});
