export class SqlQueryError extends Error {
    private static getErrorMessage(error: any): string {
        if (error == null) {
            return '';
        }
        if (error instanceof Error) {
            return error.message;
        }

        if (typeof error.toString === 'function') {
            return error.toString();
        }

        return String(error);
    }

    public readonly originalError?: Error & {
        position?: string;
    };

    public constructor(
        error: any,
        public readonly sqlQuery: string,
        public readonly sqlParameters: ReadonlyArray<any> | null,
    ) {
        super(SqlQueryError.getErrorMessage(error));
        Object.setPrototypeOf(this, SqlQueryError.prototype);
        if (error instanceof Error) {
            this.originalError = error;
        }
    }
}
