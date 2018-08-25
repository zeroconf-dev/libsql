import { SqlQueryError } from './SqlQueryError';

export abstract class UnexpectedNumberOfResultsError extends SqlQueryError {
    public constructor(message: string, sqlQuery: string, sqlParameters: ReadonlyArray<any> | null) {
        super(message, sqlQuery, sqlParameters);
        Object.setPrototypeOf(this, UnexpectedNumberOfResultsError.prototype);
    }
}
