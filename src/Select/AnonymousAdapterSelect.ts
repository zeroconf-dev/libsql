import type { Adapter } from '@zeroconf/libsql/Adapter.js';
import { RawInterpolationString } from '@zeroconf/libsql/TemplateInput/RawInterpolationString.js';

export function anonymousAdapterSelect<T>(adapter: Adapter<T>, expr: string): RawInterpolationString {
    return new RawInterpolationString('(' + adapter.wrapOutputValue(expr) + '::text)');
}
