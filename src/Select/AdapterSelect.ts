import { DataAdapterMap } from '../Adapter/DataAdapters';
import { getAdapter } from '../Adapter/GetAdapter';
import { RawInterpolationString } from '../TemplateInput/RawInterpolationString';

export function adapterSelect<TAdapter extends keyof DataAdapterMap>(
    adapterName: TAdapter,
    expr: string,
): RawInterpolationString {
    const adapter = getAdapter(adapterName);

    return new RawInterpolationString('(' + adapter.wrapOutputValue(expr) + '::text)');
}
