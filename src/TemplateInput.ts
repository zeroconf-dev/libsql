import { RawInterpolationString } from './RawInterpolationString';
import { ParamInput } from './ParamInput';
import { ColumnSelect } from './ColumnSelect';
import { ForeignColumnSelect } from './ForeignColumnSelect';
import { SqlPartString } from './SqlPartString';
import { InputTableWithValues } from './InputTableWithValues';
import { ColumnInputNames } from './ColumnInputNames';
import { AdapterParamInput } from './AdapterParamInput';
import { ForeignColumnInputNames } from './ForeignColumnInputNames';
import { ColumnUpdate } from './ColumnUpdate';
import { ColumnChanged } from './ColumnChanged';
import { ForeignColumnChanged } from './ForeignColumnChanged';
import { ForeignColumnUpdate } from './ForeignColumnUpdate';

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
