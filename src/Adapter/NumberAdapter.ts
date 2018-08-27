import { AdapterBase } from './AdapterBase';

type NumberTypes = 'integer' | 'double' | 'float';

export class NumberAdapter extends AdapterBase<number> {
    public constructor(databaseType: NumberTypes = 'integer') {
        super(databaseType);
    }

    public fromSqlValue(value: string): number {
        return Number(value);
    }

    public toSqlValue(value: number): string {
        return value.toString();
    }
}
