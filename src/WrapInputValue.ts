import { DatabaseTypeAdapter } from './DatabaseTypeAdapter';

export function wrapInputValue<T>(input: string, adapter: DatabaseTypeAdapter<T>): string {
    return adapter.wrapInputValue(input);
}
