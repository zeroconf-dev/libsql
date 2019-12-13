import { Template } from '@zeroconf/libsql/Template';
import { TemplateInput } from '@zeroconf/libsql/TemplateInput';

export function Query<T = unknown>(parts: TemplateStringsArray, ...input: TemplateInput<T>[]): Template<T> {
    return new Template<T>(parts, input);
}
