import { Adapter } from '@zeroconf/libsql/Adapter';

export function wrapInputValue<T>(input: string, adapter: Adapter<T>): string {
    return adapter.wrapInputValue(input);
}
