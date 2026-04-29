import type { Client } from '@zeroconf/libsql/Runtime/Client.js';
import type { Escaper } from '@zeroconf/libsql/Runtime/Escaper.js';

export abstract class Platform<TClient extends Client<TDB>, TDB = any> {
    public constructor(public readonly client: TClient, public readonly escape: Escaper) {}
}
