/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '@components/(.*)$': '<rootDir>/src/components/$1',
    '@contexts/(.*)$': '<rootDir>/src/contexts/$1',
    '@store/(.*)$': '<rootDir>/src/store/$1',
    '@utils/(.*)$': '<rootDir>/src/utils/$1',
    '@enums/(.*)$': '<rootDir>/src/enums/$1',
    '@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '@/(.*)$': '<rootDir>/src/$1',

    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__mocks__/fileMock.ts',
    '\\.(css|scss)$': '<rootDir>/src/__mocks__/styleMock.ts',
    '(assets|models|services)': '<rootDir>/src/__mocks__/fileMock.ts',
  },
  setupFilesAfterEnv: ['<rootDir>/src/utils/tests/setupTests.ts'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePaths: ['<rootDir>'],
  testEnvironment: 'jsdom',
};
