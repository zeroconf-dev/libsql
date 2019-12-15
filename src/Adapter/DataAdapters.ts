import { Adapter } from '@zeroconf/libsql/Adapter';
import { ArrayAdapter } from '@zeroconf/libsql/Adapter/ArrayAdapter';
import { BooleanAdapter } from '@zeroconf/libsql/Adapter/BooleanAdapter';
import { DateAdapter } from '@zeroconf/libsql/Adapter/DateAdapter';
import { NumberAdapter } from '@zeroconf/libsql/Adapter/NumberAdapter';
import { StringAdapter } from '@zeroconf/libsql/Adapter/StringAdapter';

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
