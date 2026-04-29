import type { Adapter } from '@zeroconf/libsql/Adapter.js';

export function toSqlValue<T>(val: T | null, adapter: Adapter<T>): string | null {
    return val == null ? null : adapter.toSqlValue(val);
}
