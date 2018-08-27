import { AdapterBase } from '../Adapter/AdapterBase';
import { AdapterParamInput } from '../TemplateInput/AdapterParamInput';

export function anonymousAdapterParam<T>(adapter: AdapterBase<T>, name: string, value: T | null): AdapterParamInput<T> {
    return new AdapterParamInput(adapter, name, value);
}
