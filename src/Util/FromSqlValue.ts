import { Adapter } from '@zeroconf/libsql/Adapter';

export function fromSqlValue<T>(val: string | null, adapter: Adapter<T>): T | null {
    return val == null ? null : adapter.fromSqlValue(val);
}
