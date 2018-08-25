import { DatabaseTypeAdapter } from './DatabaseTypeAdapter';

export function fromSqlValue<T>(val: string | null, adapter: DatabaseTypeAdapter<T>): T | null {
    return val == null ? null : adapter.fromSQLValue(val);
}
