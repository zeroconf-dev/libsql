import { forceEscapeIdent } from './ForceEscapeIdent';
import escape from 'pg-escape';

export function escapeIdent(ident: string): string {
    if (/[A-Z]/.test(ident)) {
        return forceEscapeIdent(ident);
    }
    return escape.ident(ident);
}
