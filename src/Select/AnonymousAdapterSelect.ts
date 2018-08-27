import { RawInterpolationString } from '../TemplateInput/RawInterpolationString';
import { AdapterBase } from '../Adapter/AdapterBase';

export function anonymousAdapterSelect<T>(adapter: AdapterBase<T>, expr: string): RawInterpolationString {
    return new RawInterpolationString('(' + adapter.wrapOutputValue(expr) + '::text)');
}
