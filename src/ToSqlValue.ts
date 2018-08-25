import { DatabaseTypeAdapter } from './DatabaseTypeAdapter';

export function toSqlValue<T>(val: T | null, adapter: DatabaseTypeAdapter<T>): string | null {
    return val == null ? null : adapter.toSqlValue(val);
}
