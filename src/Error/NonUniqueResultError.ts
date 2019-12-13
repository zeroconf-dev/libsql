import { UnexpectedNumberOfResultsError } from '@zeroconf/libsql/Error/UnexpectedNumberOfResultsError';

export class NonUniqueResultError extends UnexpectedNumberOfResultsError {
    public constructor(
        public sqlQuery: string,
        sqlParameters: readonly any[] | null,
        public readonly numberOfRows: number,
    ) {
        super(`Expected a unique result. Instead ${numberOfRows} results were found.`, sqlQuery, sqlParameters);
        Object.setPrototypeOf(this, NonUniqueResultError.prototype);
    }
}
