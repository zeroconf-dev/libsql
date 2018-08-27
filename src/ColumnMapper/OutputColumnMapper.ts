export interface OutputColumnMapperFn {
    (prefix: string): string;
}

export interface OutputColumnMapperComplex {
    mapValue: (value: any) => any;
    sqlExpr: OutputColumnMapperFn;
}

export type OutputColumnMapper = OutputColumnMapperComplex | OutputColumnMapperFn;
