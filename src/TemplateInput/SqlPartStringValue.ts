import { AdapterParamInput } from '@zeroconf/libsql/TemplateInput/AdapterParamInput';
import { ParamInput } from '@zeroconf/libsql/TemplateInput/ParamInput';
import { RawInterpolationString } from '@zeroconf/libsql/TemplateInput/RawInterpolationString';
import { SqlPartString } from '@zeroconf/libsql/TemplateInput/SqlPartString';

export type SqlPartStringValue = RawInterpolationString | ParamInput | SqlPartString | AdapterParamInput<any>;
