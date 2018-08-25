import { RawInterpolationString } from './RawInterpolationString';

export function unsafeRawInterpolation(str: string): RawInterpolationString {
    return new RawInterpolationString(str);
}
