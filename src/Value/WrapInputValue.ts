import type { Adapter } from '@zeroconf/libsql/Adapter.js';

export function wrapInputValue<T>(input: string, adapter: Adapter<T>): string {
    return adapter.wrapInputValue(input);
}
