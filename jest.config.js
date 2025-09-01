/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react-jsx', // <— key line: compile TSX to React
          esModuleInterop: true,
        },
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testMatch: ['**/__tests__/**/*.(ts|tsx)', '**/*.(test|spec).(ts|tsx)'],
  collectCoverage: true,
  coverageReporters: ['lcov', 'text-summary'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}', // include only TS/TSX source files
    '!src/**/*.d.ts', // ignore type declarations
    '!src/tests/**', // ignore test files
    '!src/**/*.test.{ts,tsx}', // ignore unit test files
    '!src/**/*.spec.{ts,tsx}', // ignore spec files
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/coverage/',
    'jest.config.js',
    'jest.setup.ts',
    'next.config.js',
    'babel.config.js',
    'docker-compose.yml',
    'Dockerfile',
    'lintstagedrc.js',
    'setupTests.js',
    'next-sitemap.config.js',
    'eslint.config.mjs',
    'src/tests/',
    'scripts',
  ],
};
module.exports = config;
