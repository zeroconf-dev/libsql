import { Adapter } from '@zeroconf/libsql/Adapter';
import { DataAdapter, DataAdapterValue } from '@zeroconf/libsql/Adapter/DataAdapters';
import { getAdapter } from '@zeroconf/libsql/Adapter/GetAdapter';
import { AdapterParamInput } from '@zeroconf/libsql/TemplateInput/AdapterParamInput';

export function adapterParam<TAdapter extends DataAdapter, TValue extends DataAdapterValue<TAdapter>>(
    adapter: TAdapter,
    name: string,
    value: TValue | null,
): AdapterParamInput<TValue> {
    return new AdapterParamInput(getAdapter(adapter) as Adapter<TValue>, name, value);
}
