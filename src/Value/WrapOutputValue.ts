import type { Adapter } from '@zeroconf/libsql/Adapter.js';

export function wrapOutputValue<T>(output: string, adapter: Adapter<T>): string {
    return adapter.wrapOutputValue(output);
}
