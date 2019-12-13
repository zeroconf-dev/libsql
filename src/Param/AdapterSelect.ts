import { DataAdapter } from '@zeroconf/libsql/Adapter/DataAdapters';
import { getAdapter } from '@zeroconf/libsql/Adapter/GetAdapter';
import { RawInterpolationString } from '@zeroconf/libsql/TemplateInput/RawInterpolationString';

export function adapterSelect<TAdapter extends DataAdapter>(
    adapterName: TAdapter,
    expr: string,
): RawInterpolationString {
    const adapter = getAdapter(adapterName);
    return new RawInterpolationString('(' + adapter.wrapOutputValue(expr) + '::text)');
}
