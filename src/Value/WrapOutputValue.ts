import { AdapterBase } from '../Adapter/AdapterBase';

export function wrapOutputValue<T>(output: string, adapter: AdapterBase<T>): string {
    return adapter.wrapOutputValue(output);
}
