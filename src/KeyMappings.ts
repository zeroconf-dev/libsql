import { TableTypeSpec } from './TableTypeSpec';
import { TableType } from './TableType';

export type KeyMappings<TSpec extends TableTypeSpec> = Partial<{ [key in keyof TableType<TSpec>]: string }>;
