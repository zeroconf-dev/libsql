import { AdapterBase } from '../Adapter/AdapterBase';
import { RawInterpolationString } from '../TemplateInput/RawInterpolationString';

export function anonymousAdapterSelect<T>(adapter: AdapterBase<T>, expr: string): RawInterpolationString {
    return new RawInterpolationString('(' + adapter.wrapOutputValue(expr) + '::text)');
}
