import { RawInterpolationString } from './RawInterpolationString';
import { ParamInput } from './ParamInput';
import { SqlPartString } from './SqlPartString';
import { AdapterParamInput } from './AdapterParamInput';

export type SqlPartStringValue = RawInterpolationString | ParamInput | SqlPartString | AdapterParamInput<any>;
