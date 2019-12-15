import { AdapterBase } from '@zeroconf/libsql/Adapter/AdapterBase';

export class BooleanAdapter extends AdapterBase<boolean> {
    public constructor() {
        super('boolean');
    }

    public fromSqlValue(val: string): boolean {
        if (val === 't' || val === 'true') {
            return true;
        } else if (val === 'f' || val === 'false') {
            return false;
        }

        throw new Error('Unexpected boolean value: ' + val);
    }

    public toSqlValue(value: boolean): string {
        return value ? 't' : 'f';
    }
}
