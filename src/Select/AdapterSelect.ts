import { DataAdapterMap } from '../Adapter/DataAdapters';
import { RawInterpolationString } from '../TemplateInput/RawInterpolationString';
import { getAdapter } from '../Adapter/GetAdapter';

export function adapterSelect<TAdapter extends keyof DataAdapterMap>(
    adapterName: TAdapter,
    expr: string,
): RawInterpolationString {
    const adapter = getAdapter(adapterName);

    return new RawInterpolationString('(' + adapter.wrapOutputValue(expr) + '::text)');
}
