import { DataAdapterMap } from './DataAdapterMap';
import { getAdapter } from './GetAdapter';

export function adapterValue<TAdapter extends keyof DataAdapterMap>(
    adapterName: TAdapter,
    value: string,
): DataAdapterMap[TAdapter][' valueType'] {
    return getAdapter(adapterName).fromSqlValue(value);
}
