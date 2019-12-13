import { MockClient } from '@zeroconf/libsql/Runtime/__mocks__/Client';
import { Platform } from '@zeroconf/libsql/Runtime/Platform';

export class MockPlatform extends Platform<MockClient> {}
