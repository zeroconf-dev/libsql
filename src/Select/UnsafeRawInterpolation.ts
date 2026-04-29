import { RawInterpolationString } from '@zeroconf/libsql/TemplateInput/RawInterpolationString.js';

export function unsafeRawInterpolation(str: string): RawInterpolationString {
    return new RawInterpolationString(str);
}
