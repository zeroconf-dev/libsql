import { SqlQueryError } from '@zeroconf/libsql/Error/SqlQueryError';

export abstract class UnexpectedNumberOfResultsError extends SqlQueryError {
    public constructor(message: string, sqlQuery: string, sqlParameters: readonly any[] | null) {
        super(message, sqlQuery, sqlParameters);
        Object.setPrototypeOf(this, UnexpectedNumberOfResultsError.prototype);
    }
}
