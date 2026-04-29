export type InputColumnMapperFn = (paramName: string) => string;

export interface InputColumnMapperComplex {
    readonly mapValue: (value: any) => any;
    readonly sqlExpr: InputColumnMapperFn;
}

export type InputColumnMapper = InputColumnMapperComplex | InputColumnMapperFn;
