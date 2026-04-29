import type { DataAdapter, DataAdapterMap } from '@zeroconf/libsql/Adapter/DataAdapters.js';
import { dataAdapters } from '@zeroconf/libsql/Adapter/DataAdapters.js';

export function getAdapter<TAdapter extends DataAdapter>(adapter: TAdapter): DataAdapterMap[TAdapter] {
    return dataAdapters[adapter];
}
