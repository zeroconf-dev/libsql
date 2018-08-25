import { DatabaseTypeAdapter } from '../DatabaseTypeAdapter';

type NumberTypes = 'integer' | 'double' | 'float';

export class NumberAdapter extends DatabaseTypeAdapter<number> {
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
