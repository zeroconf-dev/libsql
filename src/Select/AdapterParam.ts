import { DataAdapterMap } from '../Adapter/DataAdapters';
import { getAdapter } from '../Adapter/GetAdapter';
import { AdapterParamInput } from '../TemplateInput/AdapterParamInput';

export function adapterParam<TAdapter extends keyof DataAdapterMap, T extends DataAdapterMap[TAdapter]>(
    adapter: TAdapter,
    name: string,
    value: T[' valueType'] | null,
): AdapterParamInput<T[' valueType']> {
    return new AdapterParamInput<T[' valueType']>(getAdapter(adapter), name, value);
}
