export type OutputColumnMapperFn = (prefix: string) => string;

export interface OutputColumnMapperComplex {
    readonly mapValue: (value: any) => any;
    readonly sqlExpr: OutputColumnMapperFn;
}

export type OutputColumnMapper = OutputColumnMapperComplex | OutputColumnMapperFn;
