import type { Adapter } from '@zeroconf/libsql/Adapter.js';

export function anonymousAdapterValue<T>(adapter: Adapter<T>, value: string): T {
    return adapter.fromSqlValue(value);
}
