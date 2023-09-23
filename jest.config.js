/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    // if your using tsconfig.paths thers is no harm in telling jest
    '@components/(.*)$': '<rootDir>/src/components/$1',
    '@contexts/(.*)$': '<rootDir>/src/contexts/$1',
    '@tests/(.*)$': '<rootDir>/src/tests/$1',
    '@store/(.*)$': '<rootDir>/src/store/$1',
    '@utils/(.*)$': '<rootDir>/src/utils/$1',
    '@enums/(.*)$': '<rootDir>/src/enums/$1',
    '@/(.*)$': '<rootDir>/src/$1',

    // mocking assests and styling
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/tests/mocks/fileMock.ts',
    '\\.(css|scss)$': '<rootDir>/src/tests/mocks/styleMock.ts',
    /* mock models and services folder */
    '(assets|models|services)': '<rootDir>/src/tests/mocks/fileMock.ts',
  },
  // to obtain access to the matchers.
  setupFilesAfterEnv: ['<rootDir>/src/utils/tests/setupTests.ts'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePaths: ['<rootDir>'],
  testEnvironment: 'jsdom',
};
