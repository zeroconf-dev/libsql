import { Adapter } from '@zeroconf/libsql/Adapter';

export function anonymousAdapterValue<T>(adapter: Adapter<T>, value: string): T {
    return adapter.fromSqlValue(value);
}
