// `jest-preset-angular/setup-env/zone` may not expose TypeScript declarations
// in some setups; ignore the TS error and call the helper to enable the
// Angular testing environment for field decorators.
// @ts-ignore
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv();