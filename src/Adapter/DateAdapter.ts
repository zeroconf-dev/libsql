import { AdapterBase } from '@zeroconf/libsql/Adapter/AdapterBase';

const SQL_VALUE_FORMAT = /\d{4}-\d{2}-\d{2}$/;

export class DateAdapter extends AdapterBase<Date> {
    public constructor() {
        super('date');
    }

    public fromSqlValue(value: string) {
        if (SQL_VALUE_FORMAT.test(value)) {
            return new Date(value);
        }
        throw new TypeError('Invalid date format');
    }

    public toSqlValue(value: Date): string {
        const year = String(value.getFullYear());
        const month = String(value.getMonth());
        const date = String(value.getDate());
        return `${year}-${month.length === 1 ? '0' + month : month}-${date.length === 1 ? '0' + date : date}`;
    }
}
