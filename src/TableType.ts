import { TableTypeSpec } from './TableTypeSpec';

export type TableType<TSpec extends TableTypeSpec> = { [key in keyof TSpec]: TSpec[key][' valueType'] | null };
