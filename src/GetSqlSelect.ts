import { ColumnMap } from './ColumnMap';
import { mapSqlSelect } from './MapSqlSelect';

const cache: Map<ColumnMap, Map<string | null, Map<string, string>>> = new Map();

export function getSqlSelect(alias: string | null, columnMap: ColumnMap, prefix: string = ''): string {
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
        const result = mapSqlSelect(alias, columnMap, prefix);

        cachedMapResults.set(prefix, result);

        return result;
    } else {
        return cached;
    }
}
