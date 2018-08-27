import { AdapterParamInput } from './AdapterParamInput';
import { ParamInput } from './ParamInput';
import { RawInterpolationString } from './RawInterpolationString';
import { SqlPartString } from './SqlPartString';

export type SqlPartStringValue = RawInterpolationString | ParamInput | SqlPartString | AdapterParamInput<any>;
