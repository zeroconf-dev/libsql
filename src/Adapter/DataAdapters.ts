import type { Adapter } from '@zeroconf/libsql/Adapter.js';
import { ArrayAdapter } from '@zeroconf/libsql/Adapter/ArrayAdapter.js';
import { BooleanAdapter } from '@zeroconf/libsql/Adapter/BooleanAdapter.js';
import { DateAdapter } from '@zeroconf/libsql/Adapter/DateAdapter.js';
import { NumberAdapter } from '@zeroconf/libsql/Adapter/NumberAdapter.js';
import { StringAdapter } from '@zeroconf/libsql/Adapter/StringAdapter.js';

const booleanAdapter = new BooleanAdapter();
const dateAdapter = new DateAdapter();

const doubleAdapter = new NumberAdapter('double');
const floatAdapter = new NumberAdapter('float');
const integerAdapter = new NumberAdapter('integer');

const citextAdapter = new StringAdapter('citext');
const textAdapter = new StringAdapter('text');
const varcharAdapter = new StringAdapter('varchar');

export const dataAdapters = {
    boolean: booleanAdapter,
    'boolean[]': new ArrayAdapter(booleanAdapter),
    citext: citextAdapter,
    'citext[]': new ArrayAdapter(citextAdapter),
    date: dateAdapter,
    'date[]': new ArrayAdapter(dateAdapter),
    double: doubleAdapter,
    'double[]': new ArrayAdapter(doubleAdapter),
    float: floatAdapter,
    'float[]': new ArrayAdapter(floatAdapter),
    integer: integerAdapter,
    'integer[]': new ArrayAdapter(integerAdapter),
    text: textAdapter,
    'text[]': new ArrayAdapter(textAdapter),
    varchar: varcharAdapter,
    'varchar[]': new ArrayAdapter(varcharAdapter),
};

export type DataAdapter = keyof DataAdapterMap;
export type DataAdapterMap = typeof dataAdapters;
export type DataAdapterValue<TAdapter extends DataAdapter> = AdapterValue<DataAdapterMap[TAdapter]>;
export type AdapterValue<TAdapter extends Adapter<any>> = TAdapter extends Adapter<infer R> ? R : never;
