import { dataAdapters, DataAdapter, DataAdapterMap } from '@zeroconf/libsql/Adapter/DataAdapters';

export function getAdapter<TAdapter extends DataAdapter>(adapter: TAdapter): DataAdapterMap[TAdapter] {
    return dataAdapters[adapter];
}
