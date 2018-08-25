import { DataAdapterMap } from './DataAdapterMap';
import { RawInterpolationString } from './RawInterpolationString';
import { getAdapter } from './GetAdapter';

export function adapterSelect<TAdapter extends keyof DataAdapterMap>(
    adapterName: TAdapter,
    expr: string,
): RawInterpolationString {
    const adapter = getAdapter(adapterName);

    return new RawInterpolationString('(' + adapter.wrapOutputValue(expr) + '::text)');
}
