import { Adapter } from '@zeroconf/libsql/Adapter';
import { AdapterParamInput } from '@zeroconf/libsql/TemplateInput/AdapterParamInput';

export function anonymousAdapterParam<T>(adapter: Adapter<T>, name: string, value: T | null): AdapterParamInput<T> {
    return new AdapterParamInput(adapter, name, value);
}
