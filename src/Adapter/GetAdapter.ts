import { DataAdapter, DataAdapterMap, dataAdapters } from './DataAdapters';

export function getAdapter<TAdapter extends DataAdapter>(adapter: TAdapter): DataAdapterMap[TAdapter] {
    return dataAdapters[adapter];
}
