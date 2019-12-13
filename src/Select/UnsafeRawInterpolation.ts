import { RawInterpolationString } from '@zeroconf/libsql/TemplateInput/RawInterpolationString';

export function unsafeRawInterpolation(str: string): RawInterpolationString {
    return new RawInterpolationString(str);
}
