import { ParamInput } from '../TemplateInput/ParamInput';

export function param(name: string, value: any): ParamInput {
    return new ParamInput(name, value);
}
