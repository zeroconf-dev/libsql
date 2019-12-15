import { Adapter } from '@zeroconf/libsql/Adapter';
import { DataAdapter, DataAdapterValue } from '@zeroconf/libsql/Adapter/DataAdapters';
import { AdapterParamInput } from '@zeroconf/libsql/TemplateInput/AdapterParamInput';
import { getAdapter } from '@zeroconf/libsql/Util/GetAdapter';

export function adapterParam<TAdapter extends DataAdapter, TValue extends DataAdapterValue<TAdapter>>(
    adapter: TAdapter,
    name: string,
    value: TValue | null,
): AdapterParamInput<TValue> {
    return new AdapterParamInput((getAdapter(adapter) as unknown) as Adapter<TValue>, name, value);
}
