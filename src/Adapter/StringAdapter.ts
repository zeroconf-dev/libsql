import { AdapterBase } from '@zeroconf/libsql/Adapter/AdapterBase';

type StringTypes = 'text' | 'citext' | 'varchar';

export class StringAdapter extends AdapterBase<string> {
    public constructor(databaseType: StringTypes = 'text') {
        super(databaseType);
    }

    public fromSqlValue(value: string): string {
        return value;
    }

    public toSqlValue(value: string): string {
        return value.toString();
    }
}
