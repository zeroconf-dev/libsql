import type { Adapter } from '@zeroconf/libsql/Adapter.js';
import { AdapterParamInput } from '@zeroconf/libsql/TemplateInput/AdapterParamInput.js';

export function anonymousAdapterParam<T>(adapter: Adapter<T>, name: string, value: T | null): AdapterParamInput<T> {
    return new AdapterParamInput(adapter, name, value);
}
