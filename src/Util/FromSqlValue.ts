import { AdapterBase } from '../Adapter/AdapterBase';

export function fromSqlValue<T>(val: string | null, adapter: AdapterBase<T>): T | null {
    return val == null ? null : adapter.fromSqlValue(val);
}
