import { Template } from './Template';
import { TemplateInput } from './TemplateInput';

export function Query<T = any>(parts: TemplateStringsArray, ...input: TemplateInput<T>[]): Template<T> {
    return new Template<T>(parts, input);
}
