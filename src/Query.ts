import { TemplateInput } from './TemplateInput';
import { Template } from './Template';

export function Query<T = any>(parts: TemplateStringsArray, ...input: TemplateInput<T>[]): Template<T> {
    return new Template<T>(parts, input);
}
