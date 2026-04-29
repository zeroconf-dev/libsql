import type { Escaper } from '@zeroconf/libsql/Runtime/Escaper.js';

export const mockEscaper: Escaper = {
    identifier: (ident: string) => ident,
};
