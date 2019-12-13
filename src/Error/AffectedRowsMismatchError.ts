import { UnexpectedNumberOfResultsError } from '@zeroconf/libsql/Error/UnexpectedNumberOfResultsError';

export class AffectedRowsMismatchError extends UnexpectedNumberOfResultsError {
    public constructor(
        public sqlQuery: string,
        sqlParameters: readonly any[] | null,
        public readonly expectedAffectedRows: number,
        public readonly actualAffectedRows: number,
    ) {
        super(
            `Mismatch between a query's expected number of affected rows and actual affected.
            Expected: ${expectedAffectedRows}, got: ${actualAffectedRows}`,
            sqlQuery,
            sqlParameters,
        );
        Object.setPrototypeOf(this, AffectedRowsMismatchError.prototype);
    }
}
