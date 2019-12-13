import { Adapter } from '@zeroconf/libsql/Adapter';
import { DateAdapter } from '@zeroconf/libsql/Adapter/DateAdapter';
import { NumberAdapter } from '@zeroconf/libsql/Adapter/NumberAdapter';
import { StringAdapter } from '@zeroconf/libsql/Adapter/StringAdapter';

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

export type DataAdapter = keyof DataAdapterMap;
export type DataAdapterMap = typeof dataAdapters;
export type DataAdapterValue<TAdapter extends DataAdapter> = AdapterValue<DataAdapterMap[TAdapter]>;
export type AdapterValue<TAdapter extends Adapter<any>> = TAdapter extends Adapter<infer R> ? R : never;
