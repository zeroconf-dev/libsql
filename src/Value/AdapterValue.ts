import { Adapter } from '@zeroconf/libsql/Adapter';
import { DataAdapter, DataAdapterValue } from '@zeroconf/libsql/Adapter/DataAdapters';
import { getAdapter } from '@zeroconf/libsql/Adapter/GetAdapter';

export function adapterValue<TAdapter extends DataAdapter, TValue extends DataAdapterValue<TAdapter>>(
    adapterName: TAdapter,
    value: string,
): TValue {
    return (getAdapter(adapterName) as Adapter<TValue>).fromSqlValue(value);
}
