import type { SqlPartStringValue } from '@zeroconf/libsql/TemplateInput/SqlPartStringValue.js';

export class SqlPartString {
    public constructor(
        public readonly queryParts: TemplateStringsArray,
        public readonly values: SqlPartStringValue[],
    ) {}
}
