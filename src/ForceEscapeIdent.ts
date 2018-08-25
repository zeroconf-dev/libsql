import escape from 'pg-escape';

export function forceEscapeIdent(ident: string): string {
    const res = escape.ident(ident);
    if (ident.indexOf('"') === -1) {
        return `"${ident}"`;
    }
    return res;
}
