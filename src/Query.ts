import { Template } from '@zeroconf/libsql/Template.js';
import type { TemplateInput } from '@zeroconf/libsql/TemplateInput.js';

export function Query<T = unknown>(parts: TemplateStringsArray, ...input: TemplateInput<T>[]): Template<T> {
    return new Template<T>(parts, input);
}
