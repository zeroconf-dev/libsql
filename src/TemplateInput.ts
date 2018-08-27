import { RawInterpolationString } from './TemplateInput/RawInterpolationString';
import { ParamInput } from './TemplateInput/ParamInput';
import { ColumnSelect } from './TemplateInput/ColumnSelect';
import { ForeignColumnSelect } from './TemplateInput/ForeignColumnSelect';
import { SqlPartString } from './TemplateInput/SqlPartString';
import { InputTableWithValues } from './TemplateInput/InputTableWithValues';
import { ColumnInputNames } from './TemplateInput/ColumnInputNames';
import { AdapterParamInput } from './TemplateInput/AdapterParamInput';
import { ForeignColumnInputNames } from './TemplateInput/ForeignColumnInputNames';
import { ColumnUpdate } from './TemplateInput/ColumnUpdate';
import { ColumnChanged } from './TemplateInput/ColumnChanged';
import { ForeignColumnChanged } from './TemplateInput/ForeignColumnChanged';
import { ForeignColumnUpdate } from './TemplateInput/ForeignColumnUpdate';

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
