import { AdapterParamInput } from './AdapterParamInput';
import { DataAdapterMap } from './DataAdapterMap';
import { getAdapter } from './GetAdapter';

export function adapterParam<TAdapter extends keyof DataAdapterMap, T extends DataAdapterMap[TAdapter]>(
    adapter: TAdapter,
    name: string,
    value: T[' valueType'] | null,
): AdapterParamInput<T[' valueType']> {
    return new AdapterParamInput<T[' valueType']>(getAdapter(adapter), name, value);
}
