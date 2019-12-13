import { Adapter } from '@zeroconf/libsql/Adapter';

export function wrapOutputValue<T>(output: string, adapter: Adapter<T>): string {
    return adapter.wrapOutputValue(output);
}
