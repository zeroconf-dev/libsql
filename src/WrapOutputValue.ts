import { DatabaseTypeAdapter } from './DatabaseTypeAdapter';

export function wrapOutputValue<T>(output: string, adapter: DatabaseTypeAdapter<T>): string {
    return adapter.wrapOutputValue(output);
}
