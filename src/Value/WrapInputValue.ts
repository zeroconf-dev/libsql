import { AdapterBase } from '../Adapter/AdapterBase';

export function wrapInputValue<T>(input: string, adapter: AdapterBase<T>): string {
    return adapter.wrapInputValue(input);
}
