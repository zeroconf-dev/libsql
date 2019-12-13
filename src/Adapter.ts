export interface Adapter<T> {
    readonly databaseType: string;
    readonly useTypeCastString: boolean;

    fromSqlValue(val: string): T;
    toSqlValue(val: T): string;
    wrapInputValue(input: string): string;
    wrapOutputValue(output: string): string;
}
