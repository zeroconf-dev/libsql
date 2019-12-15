import { DataAdapter } from '@zeroconf/libsql/Adapter/DataAdapters';
import { RawInterpolationString } from '@zeroconf/libsql/TemplateInput/RawInterpolationString';
import { getAdapter } from '@zeroconf/libsql/Util/GetAdapter';

export function adapterSelect<TAdapter extends DataAdapter>(
    adapterName: TAdapter,
    expr: string,
): RawInterpolationString {
    const adapter = getAdapter(adapterName);
    return new RawInterpolationString('(' + adapter.wrapOutputValue(expr) + '::text)');
}
