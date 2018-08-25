import { DatabaseTypeAdapter } from './DatabaseTypeAdapter';

export class AdapterParamInput<T> {
    public constructor(
        public readonly adapter: DatabaseTypeAdapter<T>,
        public readonly name: string,
        public readonly value: T | null,
    ) {}

    public get typeCastString(): string | null {
        if (this.adapter.useTypeCastString) {
            return this.adapter.databaseType;
        }
        return null;
    }

    public wrapInput(input: string): string {
        return this.adapter.wrapInputValue(input);
    }
}
