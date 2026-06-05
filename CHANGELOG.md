# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.81] - 2026-06-05

### Fixed

- Resolved 16 security vulnerabilities in transitive dependencies by adding `overrides` for `brace-expansion`, `minimatch`, `diff`, `flatted`, `picomatch`, and `js-yaml`

### Changed

- Updated `@typescript-eslint/eslint-plugin` from 8.59.4 to 8.60.1
- Updated `@typescript-eslint/parser` from 8.59.4 to 8.60.1
- Updated `eslint-import-resolver-typescript` from 4.4.4 to 4.4.5
- Updated `eslint-plugin-prettier` from 5.5.5 to 5.5.6
- Updated `@types/node` from 25.8.4 to 25.9.1
- Updated `@types/react` from 19.2.15 to 19.2.16

## [1.0.8] - 2026-05-24

### Changed

- Updated `date-fns` from 4.1.0 to 4.3.0
- Updated `typescript` from 5.9.3 to 6.0.3
- Updated `eslint` from 9.37.0 to 10.4.0
- Updated `@eslint/js` from 9.37.0 to 10.0.1
- Updated `@tsconfig/node-lts` from 22.0.2 to 24.0.0
- Updated `@types/node` from 24.8.1 to 25.9.1
- Updated `@types/react` from 19.2.2 to 19.2.15
- Updated `@typescript-eslint/eslint-plugin` from 8.46.1 to 8.59.4
- Updated `@typescript-eslint/parser` from 8.46.1 to 8.59.4
- Updated `eslint-plugin-jest` from 29.0.1 to 29.15.2
- Updated `eslint-plugin-prettier` from 5.5.4 to 5.5.5
- Updated `jest` from 30.2.0 to 30.4.2
- Updated `prettier` from 3.6.2 to 3.8.3
- Updated `ts-jest` from 29.4.5 to 29.4.11
- Updated peer dependency `@mui/material` from ^7.3.4 to ^9.0.1
- Updated peer dependency `@mui/x-date-pickers` from ^8.14.1 to ^9.3.0
- Updated peer dependency `react` from ^19.2.0 to ^19.2.6

### Fixed

- Added `"types": ["jest"]` to tsconfig for TypeScript 6 / `@tsconfig/node-lts` 24 compatibility

### Added

- Test coverage improved from 87.61% to 100% (Statements, Functions, Lines)
- Added tests for `expandFormat`, `getFormatHelperText`, `getDiff` all units, date getters/setters, start/end of periods, day comparison methods, month navigation, week number, and parse edge cases

## [1.0.7] - 2025-06-08

### Changed

- Bump version to 1.0.7

## [1.0.6] - 2025-06-08

### Fixed

- Configure Vercel to use Bun for example build

## [1.0.5] - 2025-06-08

### Fixed

- Make `isValid` method a type predicate for MUI X compatibility

## [1.0.4] - 2025-06-08

### Changed

- Optimize dependencies and update peer dependencies

## [1.0.3] - 2025-06-08

### Fixed

- Update Thai locale imports and ESLint configuration

## [1.0.2] - 2025-06-08

### Changed

- Update package name to `@midseelee/date-fns-buddhist-adapter`

## [1.0.1] - 2025-06-08

### Fixed

- Set UTC timezone for Jest tests to ensure consistent results

## [1.0.0] - 2025-06-08

### Added

- Initial release of `@midseelee/date-fns-buddhist-adapter`
- date-fns adapter with Buddhist year (BE) conversion
- Supports MUI X Date Pickers
- Thai locale support
- Full date formatting with Buddhist year (AD + 543)
- Date parsing with Buddhist year conversion back to AD
