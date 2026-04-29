import { UnexpectedNumberOfResultsError } from '@zeroconf/libsql/Error/UnexpectedNumberOfResultsError.js';

export class NoResultsFoundError extends UnexpectedNumberOfResultsError {
    public constructor(
        public override sqlQuery: string,
        sqlParameters: readonly any[] | null,
    ) {
        super('No results were found for the query. One or more results were expected.', sqlQuery, sqlParameters);
        Object.setPrototypeOf(this, NoResultsFoundError.prototype);
    }
}
