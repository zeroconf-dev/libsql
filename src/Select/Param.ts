import { ParamInput } from '@zeroconf/libsql/TemplateInput/ParamInput';

export function param(name: string, value: any): ParamInput {
    return new ParamInput(name, value);
}
