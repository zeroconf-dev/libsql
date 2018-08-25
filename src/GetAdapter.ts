import { DataAdapter } from './DataAdapter';
import { DataAdapterMap } from './DataAdapterMap';
import { dataAdapters } from './DataAdapters';

export function getAdapter<TAdapter extends DataAdapter>(adapter: TAdapter): DataAdapterMap[TAdapter] {
    return dataAdapters[adapter];
}
