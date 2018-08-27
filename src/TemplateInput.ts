import { AdapterParamInput } from './TemplateInput/AdapterParamInput';
import { ColumnChanged } from './TemplateInput/ColumnChanged';
import { ColumnInputNames } from './TemplateInput/ColumnInputNames';
import { ColumnSelect } from './TemplateInput/ColumnSelect';
import { ColumnUpdate } from './TemplateInput/ColumnUpdate';
import { ForeignColumnChanged } from './TemplateInput/ForeignColumnChanged';
import { ForeignColumnInputNames } from './TemplateInput/ForeignColumnInputNames';
import { ForeignColumnSelect } from './TemplateInput/ForeignColumnSelect';
import { ForeignColumnUpdate } from './TemplateInput/ForeignColumnUpdate';
import { InputTableWithValues } from './TemplateInput/InputTableWithValues';
import { ParamInput } from './TemplateInput/ParamInput';
import { RawInterpolationString } from './TemplateInput/RawInterpolationString';
import { SqlPartString } from './TemplateInput/SqlPartString';

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
