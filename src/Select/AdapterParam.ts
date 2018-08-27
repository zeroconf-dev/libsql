import { AdapterParamInput } from '../TemplateInput/AdapterParamInput';
import { DataAdapterMap } from '../Adapter/DataAdapters';
import { getAdapter } from '../Adapter/GetAdapter';

export function adapterParam<TAdapter extends keyof DataAdapterMap, T extends DataAdapterMap[TAdapter]>(
    adapter: TAdapter,
    name: string,
    value: T[' valueType'] | null,
): AdapterParamInput<T[' valueType']> {
    return new AdapterParamInput<T[' valueType']>(getAdapter(adapter), name, value);
}
