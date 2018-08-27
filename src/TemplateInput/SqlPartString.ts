import { SqlPartStringValue } from './SqlPartStringValue';

export class SqlPartString {
    public constructor(
        public readonly queryParts: TemplateStringsArray,
        public readonly values: SqlPartStringValue[],
    ) {}
}
