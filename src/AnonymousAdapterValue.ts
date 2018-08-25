import { DatabaseTypeAdapter } from './DatabaseTypeAdapter';

export function anonymousAdapterValue<T>(adapter: DatabaseTypeAdapter<T>, value: string): T {
    return adapter.fromSqlValue(value);
}
