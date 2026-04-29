import type { Adapter } from '@zeroconf/libsql/Adapter.js';
import type { DataAdapter, DataAdapterValue } from '@zeroconf/libsql/Adapter/DataAdapters.js';
import { getAdapter } from '@zeroconf/libsql/Util/GetAdapter.js';

export function adapterValue<TAdapter extends DataAdapter, TValue extends DataAdapterValue<TAdapter>>(
    adapterName: TAdapter,
    value: string,
): TValue {
    return ((getAdapter(adapterName) as unknown) as Adapter<TValue>).fromSqlValue(value);
}
