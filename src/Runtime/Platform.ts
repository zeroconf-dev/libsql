import { Client } from './Client';
import { Escaper } from '../Escaper';

export abstract class Platform<TClient extends Client<any>> {
    public constructor(public readonly client: TClient, public readonly escape: Escaper) {}
}
