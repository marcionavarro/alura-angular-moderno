module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|mjs|js)$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        isolatedModules: false,
        diagnostics: false,
      },
    ],
  },
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'css'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
};

