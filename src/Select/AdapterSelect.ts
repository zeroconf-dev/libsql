import type { DataAdapter } from '@zeroconf/libsql/Adapter/DataAdapters.js';
import { RawInterpolationString } from '@zeroconf/libsql/TemplateInput/RawInterpolationString.js';
import { getAdapter } from '@zeroconf/libsql/Util/GetAdapter.js';

export function adapterSelect<TAdapter extends DataAdapter>(
    adapterName: TAdapter,
    expr: string,
): RawInterpolationString {
    const adapter = getAdapter(adapterName);
    return new RawInterpolationString('(' + adapter.wrapOutputValue(expr) + '::text)');
}
