module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@store(.*)$': '<rootDir>/src/store$1',
    '^@utils(.*)$': '<rootDir>/src/utils$1',
    '^styles(.*)$': '<rootDir>/src/styles$1',
    '^@assets(.*)$': '<rootDir>/src/assets$1',
    '^@enums(.*)$': '<rootDir>/src/enums$1',
    '^types(.*)$': '<rootDir>/src/types$1',
    '^hooks(.*)$': '<rootDir>/src/hooks$1',
    '^__mocks__(.*)$': '<rootDir>/src/__mocks__$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__mocks__/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/src/__mocks__/style-mock.js',
  },
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/src/utils/testing/setup-tests.ts'],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  /* coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  }, */
};
