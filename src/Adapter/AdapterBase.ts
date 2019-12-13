import { Adapter } from '@zeroconf/libsql/Adapter';

export abstract class AdapterBase<T> implements Adapter<T> {
    public readonly databaseType: string;
    public readonly useTypeCastString: boolean;

    public constructor(databaseType: string, useTypeCastString?: boolean) {
        this.databaseType = databaseType;
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
