import { NumberAdapter } from './NumberAdapter';
import { StringAdapter } from './StringAdapter';

const integerAdapter = new NumberAdapter();
const citextAdapter = new StringAdapter('citext');
const textAdapter = new StringAdapter('text');
const varcharAdapter = new StringAdapter('varchar');

export const dataAdapters = {
    citext: citextAdapter,
    integer: integerAdapter,
    text: textAdapter,
    varchar: varcharAdapter,
};

export type DataAdapterMap = typeof dataAdapters;
export type DataAdapter = keyof DataAdapterMap;
