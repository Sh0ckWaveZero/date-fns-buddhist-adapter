import type { Config } from 'jest'

// ts-jest resolves types with the legacy node10 resolver, which MUI v9's
// dual entrypoints reject; `tsc --noEmit` (bundler resolution) stays the
// type gate, so diagnostics are disabled here
const tsTransform = [
  'ts-jest',
  {
    diagnostics: false,
  },
] as const

const config: Config = {
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['text-summary'],
  projects: [
    {
      displayName: 'node',
      roots: ['<rootDir>/src'],
      preset: 'ts-jest',
      transform: {
        '^.+\\.tsx?$': tsTransform,
      },
      testEnvironment: 'node',
      testMatch: ['<rootDir>/src/**/*.spec.ts'],
      collectCoverageFrom: [
        'src/**/*.ts',
        '!**/node_modules/**',
        '!src/models/**',
      ],
    },
    {
      displayName: 'dom',
      roots: ['<rootDir>/src'],
      preset: 'ts-jest',
      transform: {
        '^.+\\.tsx?$': tsTransform,
      },
      testEnvironment: 'jsdom',
      setupFiles: ['<rootDir>/jest.setup.dom.ts'],
      testMatch: ['<rootDir>/src/**/*.spec.tsx'],
      collectCoverageFrom: ['src/**/*.tsx', '!**/node_modules/**'],
    },
  ],
}

export default config
