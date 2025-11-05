export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/pruebas'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: {
        module: 'nodenext',
        moduleResolution: 'nodenext',
        target: 'ES2020',
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        isolatedModules: true,
      },
      diagnostics: {
        ignoreCodes: [151002],
      },
    }],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/pruebas/**',
    '!src/security/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'text', 'lcov'],
};

