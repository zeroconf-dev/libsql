import { Escaper } from '@zeroconf/libsql/Runtime/Escaper';

export const mockEscaper: Escaper = {
    identifier: (ident: string) => ident,
};
