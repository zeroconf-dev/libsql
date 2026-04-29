import type { AdapterParamInput } from '@zeroconf/libsql/TemplateInput/AdapterParamInput.js';
import type { ColumnChanged } from '@zeroconf/libsql/TemplateInput/ColumnChanged.js';
import type { ColumnInputNames } from '@zeroconf/libsql/TemplateInput/ColumnInputNames.js';
import type { ColumnSelect } from '@zeroconf/libsql/TemplateInput/ColumnSelect.js';
import type { ColumnUpdate } from '@zeroconf/libsql/TemplateInput/ColumnUpdate.js';
import type { ForeignColumnChanged } from '@zeroconf/libsql/TemplateInput/ForeignColumnChanged.js';
import type { ForeignColumnInputNames } from '@zeroconf/libsql/TemplateInput/ForeignColumnInputNames.js';
import type { ForeignColumnSelect } from '@zeroconf/libsql/TemplateInput/ForeignColumnSelect.js';
import type { ForeignColumnUpdate } from '@zeroconf/libsql/TemplateInput/ForeignColumnUpdate.js';
import type { InputTableWithValues } from '@zeroconf/libsql/TemplateInput/InputTableWithValues.js';
import type { ParamInput } from '@zeroconf/libsql/TemplateInput/ParamInput.js';
import type { RawInterpolationString } from '@zeroconf/libsql/TemplateInput/RawInterpolationString.js';
import type { SqlPartString } from '@zeroconf/libsql/TemplateInput/SqlPartString.js';

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
