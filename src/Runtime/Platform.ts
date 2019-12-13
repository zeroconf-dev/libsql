import { Client } from '@zeroconf/libsql/Runtime/Client';
import { Escaper } from '@zeroconf/libsql/Runtime/Escaper';

export abstract class Platform<TClient extends Client<TDB>, TDB = any> {
    public constructor(public readonly client: TClient, public readonly escape: Escaper) {}
}
