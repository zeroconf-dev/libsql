import { DatabaseTypeAdapter } from './DatabaseTypeAdapter';
import { AdapterParamInput } from './AdapterParamInput';

export function anonymousAdapterParam<T>(
    adapter: DatabaseTypeAdapter<T>,
    name: string,
    value: T | null,
): AdapterParamInput<T> {
    return new AdapterParamInput(adapter, name, value);
}
