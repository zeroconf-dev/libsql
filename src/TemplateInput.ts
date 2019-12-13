import { AdapterParamInput } from '@zeroconf/libsql/TemplateInput/AdapterParamInput';
import { ColumnChanged } from '@zeroconf/libsql/TemplateInput/ColumnChanged';
import { ColumnInputNames } from '@zeroconf/libsql/TemplateInput/ColumnInputNames';
import { ColumnSelect } from '@zeroconf/libsql/TemplateInput/ColumnSelect';
import { ColumnUpdate } from '@zeroconf/libsql/TemplateInput/ColumnUpdate';
import { ForeignColumnChanged } from '@zeroconf/libsql/TemplateInput/ForeignColumnChanged';
import { ForeignColumnInputNames } from '@zeroconf/libsql/TemplateInput/ForeignColumnInputNames';
import { ForeignColumnSelect } from '@zeroconf/libsql/TemplateInput/ForeignColumnSelect';
import { ForeignColumnUpdate } from '@zeroconf/libsql/TemplateInput/ForeignColumnUpdate';
import { InputTableWithValues } from '@zeroconf/libsql/TemplateInput/InputTableWithValues';
import { ParamInput } from '@zeroconf/libsql/TemplateInput/ParamInput';
import { RawInterpolationString } from '@zeroconf/libsql/TemplateInput/RawInterpolationString';
import { SqlPartString } from '@zeroconf/libsql/TemplateInput/SqlPartString';

export type TemplateInput<T> =
    | AdapterParamInput<any>
    | ColumnChanged
    | ColumnInputNames
    | ColumnSelect<T>
    | ColumnUpdate
    | ForeignColumnChanged
    | ForeignColumnInputNames
    | ForeignColumnSelect<T>
    | ForeignColumnUpdate
    | InputTableWithValues<any>
    | ParamInput
    | RawInterpolationString
    | SqlPartString;
