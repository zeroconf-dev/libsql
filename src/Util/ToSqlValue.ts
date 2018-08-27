import { AdapterBase } from '../Adapter/AdapterBase';

export function toSqlValue<T>(val: T | null, adapter: AdapterBase<T>): string | null {
    return val == null ? null : adapter.toSqlValue(val);
}
