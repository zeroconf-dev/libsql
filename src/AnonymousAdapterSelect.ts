import { RawInterpolationString } from './RawInterpolationString';
import { DatabaseTypeAdapter } from './DatabaseTypeAdapter';

export function anonymousAdapterSelect<T>(adapter: DatabaseTypeAdapter<T>, expr: string): RawInterpolationString {
    return new RawInterpolationString('(' + adapter.wrapOutputValue(expr) + '::text)');
}
