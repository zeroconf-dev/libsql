export function prefixParamName(prefix: string, paramName: string): string {
    return `[${prefix}].${paramName}`;
}
