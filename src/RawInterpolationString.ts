export class RawInterpolationString {
    public constructor(public readonly str: string) {}
    public toString() {
        return this.str;
    }
    public valueOf() {
        return this.str;
    }
}
