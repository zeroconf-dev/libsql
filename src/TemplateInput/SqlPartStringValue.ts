import type { AdapterParamInput } from '@zeroconf/libsql/TemplateInput/AdapterParamInput.js';
import type { ParamInput } from '@zeroconf/libsql/TemplateInput/ParamInput.js';
import type { RawInterpolationString } from '@zeroconf/libsql/TemplateInput/RawInterpolationString.js';
import type { SqlPartString } from '@zeroconf/libsql/TemplateInput/SqlPartString.js';

export type SqlPartStringValue = RawInterpolationString | ParamInput | SqlPartString | AdapterParamInput<any>;
