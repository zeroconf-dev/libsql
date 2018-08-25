import { RawInterpolationString } from './RawInterpolationString';
import { escapeIdent } from './EscapeIdent';

export function quoteIdentifier(identifier: string): RawInterpolationString {
    return new RawInterpolationString(escapeIdent(identifier));
}
