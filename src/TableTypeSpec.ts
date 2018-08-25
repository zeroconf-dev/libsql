import { DatabaseTypeAdapter } from './DatabaseTypeAdapter';

export interface TableTypeSpec {
    readonly [key: string]: DatabaseTypeAdapter<any>;
}
