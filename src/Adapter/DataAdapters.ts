import { DateAdapter } from './DateAdapter';
import { NumberAdapter } from './NumberAdapter';
import { StringAdapter } from './StringAdapter';

const dateAdapter = new DateAdapter();

const doubleAdapter = new NumberAdapter('double');
const floatAdapter = new NumberAdapter('float');
const integerAdapter = new NumberAdapter('integer');

const citextAdapter = new StringAdapter('citext');
const textAdapter = new StringAdapter('text');
const varcharAdapter = new StringAdapter('varchar');

export const dataAdapters = {
    citext: citextAdapter,
    date: dateAdapter,
    double: doubleAdapter,
    float: floatAdapter,
    integer: integerAdapter,
    text: textAdapter,
    varchar: varcharAdapter,
};

export type DataAdapterMap = typeof dataAdapters;
export type DataAdapter = keyof DataAdapterMap;
