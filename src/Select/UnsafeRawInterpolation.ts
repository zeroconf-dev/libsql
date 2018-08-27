import { RawInterpolationString } from '../TemplateInput/RawInterpolationString';

export function unsafeRawInterpolation(str: string): RawInterpolationString {
    return new RawInterpolationString(str);
}
