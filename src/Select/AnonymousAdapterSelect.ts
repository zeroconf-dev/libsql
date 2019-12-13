import { Adapter } from '@zeroconf/libsql/Adapter';
import { RawInterpolationString } from '@zeroconf/libsql/TemplateInput/RawInterpolationString';

export function anonymousAdapterSelect<T>(adapter: Adapter<T>, expr: string): RawInterpolationString {
    return new RawInterpolationString('(' + adapter.wrapOutputValue(expr) + '::text)');
}
