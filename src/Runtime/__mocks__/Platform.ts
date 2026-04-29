import type { MockClient } from '@zeroconf/libsql/Runtime/__mocks__/Client.js';
import { Platform } from '@zeroconf/libsql/Runtime/Platform.js';

export class MockPlatform extends Platform<MockClient> {}
