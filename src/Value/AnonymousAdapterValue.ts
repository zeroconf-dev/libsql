import { AdapterBase } from '../Adapter/AdapterBase';

export function anonymousAdapterValue<T>(adapter: AdapterBase<T>, value: string): T {
    return adapter.fromSqlValue(value);
}
