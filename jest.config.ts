import type {Config} from '@jest/types';
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  collectCoverageFrom: ['**/src/**/*.ts'],
};
export default config;
