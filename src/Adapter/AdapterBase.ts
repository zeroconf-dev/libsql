export abstract class AdapterBase<T> {
    public readonly ' valueType': T;
    public readonly useTypeCastString: boolean;
    public constructor(public readonly databaseType: string, useTypeCastString?: boolean) {
        this.useTypeCastString = useTypeCastString || false;
    }

    public abstract fromSqlValue(val: string): T;
    public abstract toSqlValue(val: T): string;

    public wrapInputValue(input: string): string {
        return input;
    }

    public wrapOutputValue(output: string): string {
        return output;
    }
}
