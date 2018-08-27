export type InputColumnMapperFn = (paramName: string) => string;

export interface InputColumnMapperComplex {
    mapValue: (value: any) => any;
    sqlExpr: InputColumnMapperFn;
}

export type InputColumnMapper = InputColumnMapperComplex | InputColumnMapperFn;
