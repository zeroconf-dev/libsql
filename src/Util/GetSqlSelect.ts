import { ColumnMap } from '@zeroconf/libsql/ColumnMapper/ColumnMap';
import { Escaper } from '@zeroconf/libsql/Runtime/Escaper';
import { mapSqlSelect } from '@zeroconf/libsql/Util/MapSqlSelect';

const cache: Map<ColumnMap, Map<string | null, Map<string, string>>> = new Map();

export function getSqlSelect(escape: Escaper, alias: string | null, columnMap: ColumnMap, prefix: string = ''): string {
    let cachedOuterMapResults = cache.get(columnMap);

    if (cachedOuterMapResults == null) {
        cachedOuterMapResults = new Map<string | null, Map<string, string>>();
        cache.set(columnMap, cachedOuterMapResults);
    }

    let cachedMapResults = cachedOuterMapResults.get(alias);

    if (cachedMapResults == null) {
        cachedMapResults = new Map<string, string>();
        cachedOuterMapResults.set(alias, cachedMapResults);
    }

    const cached = cachedMapResults.get(prefix);

    if (cached == null) {
        const result = mapSqlSelect(escape, alias, columnMap, prefix);

        cachedMapResults.set(prefix, result);

        return result;
    } else {
        return cached;
    }
}
