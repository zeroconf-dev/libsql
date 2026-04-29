import type { Adapter } from '@zeroconf/libsql/Adapter.js';
import type { DataAdapter, DataAdapterValue } from '@zeroconf/libsql/Adapter/DataAdapters.js';
import { AdapterParamInput } from '@zeroconf/libsql/TemplateInput/AdapterParamInput.js';
import { getAdapter } from '@zeroconf/libsql/Util/GetAdapter.js';

export function adapterParam<TAdapter extends DataAdapter, TValue extends DataAdapterValue<TAdapter>>(
    adapter: TAdapter,
    name: string,
    value: TValue | null,
): AdapterParamInput<TValue> {
    return new AdapterParamInput((getAdapter(adapter) as unknown) as Adapter<TValue>, name, value);
}
