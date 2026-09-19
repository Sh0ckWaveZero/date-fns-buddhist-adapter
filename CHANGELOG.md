# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2026-09-19

### Added

- New `date-range-picker` subpath export (`@midseelee/date-fns-buddhist-adapter/date-range-picker`): a MUI-styled date range picker (`PickerBase` inline, `PickerModal` popover/dialog) adapted from `mui-daterange-picker-plus`, with Buddhist Era labels by default (`buddhistEra`, default `true`), locale-aware week starts, `minDate`/`maxDate`, quick-select presets and custom labels
- New `PickerInput`: read-only MUI `TextField` trigger with a calendar icon that opens the picker popover, displaying the selected range in Buddhist Era (`format`, default `'dd/MM/yyyy'`) with an uppercase-format placeholder when empty; supports the same controlled/uncontrolled contract
- `getDefaultRanges` localizes preset labels by `locale.code` (Thai `th` → `วันนี้`, `เมื่อวาน`, `สัปดาห์นี้`, `สัปดาห์ที่แล้ว`, `7 วันล่าสุด`, `เดือนนี้`, `เดือนที่แล้ว`, `ปีนี้`, `ปีที่แล้ว`); other locales fall back to English labels
- Comprehensive documentation for the picker: README API reference (component overview, full props tables, `Labels`, `getDefaultRanges`, types, behavior notes and Thai-language recipes) and complete JSDoc on every picker prop and type
- MUI-style controlled/uncontrolled value support: the picker is controlled via `value` + `onChange`, or uncontrolled via `defaultValue` (a controlled picker opens on its value's month); `initialDateRange` remains as a deprecated alias of `defaultValue`
- jsdom component test suite (`jest-environment-jsdom`, `@testing-library/react`) running as a second jest project (`dom`) alongside the existing node project, covering the controlled/uncontrolled behavior and the modal submit flow

### Changed

- Bumped `peerDependencies` minimums to `@mui/material` ^9.4.0, `@mui/x-date-pickers` ^9.14.0 and `react` ^19.3.0, matching the latest verified versions (the `date-range-picker` subpath itself only needs `@mui/material` and `react`)
- Updated dependencies to the latest versions: `eslint` 10.11.0, `jest`/`jest-environment-jsdom` 30.5.2, `prettier` 3.9.8, `react`/`react-dom` 19.3.0, `@types/react` 19.3.0, `@types/node` 26.6.2, `@typescript-eslint/*` 8.70.0 (and matching `@typescript-eslint/utils` override), `eslint-plugin-jest` 29.16.6, `ts-jest` 29.4.12, `@tsconfig/node-lts` 24.0.1. `typescript` stays at 6.0.3 — the newest version supported by `@typescript-eslint` (`<6.1.0`) and `ts-jest` (`<7`)
- Example app: updated `@mui/x-date-pickers` 9.14.0, `date-fns` 4.4.0, `vite` 8.3.0, `@vitejs/plugin-react` 6.1.1 and reworked the page into four demo sections (adapter DatePicker, `PickerInput`, `PickerModal`, `PickerBase`), each with a usage snippet and equally sized inputs
- `formatWithEra` now renders Buddhist Era years by default (the `buddhistEra` option defaults to `true`, matching the picker prop's documented default)
- `Footer` and `Month` components use `sx` instead of deprecated MUI system props (`textAlign`, `color`)
- Example app now links the local package via `file:..` and demonstrates the controlled `PickerModal` with Buddhist Era formatting

## [1.1.0] - 2026-09-01

### Security

- Resolved all reported vulnerabilities (was: 1 critical, 6 high, 1 moderate, 2 low) by regenerating `package-lock.json` with patched transitive dev dependencies and updating `example/` dependencies (`vite` to 8.2.2, plus `nanoid`, `postcss`, `yaml` fixes)
- Updated vulnerable transitive dependencies in `bun.lock` for root and `example/` (`js-yaml` 3.15.2, `minimatch` 3.1.5 / 9.0.9 / 10.2.6, `picomatch` 2.3.2 / 4.0.7, `brace-expansion`, `diff`, `flatted`)
- Added `legacy-peer-deps=true` to `.npmrc` (root and `example/`) so `npm ci` works until `eslint-plugin-import` declares `eslint` 10 support in its peer range

### Changed

- Verified compatibility with the latest MUI: dev dependency `@mui/material` updated from 9.0.1 to 9.4.0, and the example app builds against `@mui/material` 9.4.0 with `@mui/x-date-pickers` 9.12.0 (peer ranges `^9.0.1` / `^9.3.0` already cover the latest versions and are unchanged)

### Fixed

- Ported legacy `.eslintignore` entries (`.vscode`, `coverage`, `example`) into `eslint.config.js` `ignores` and removed the file, which ESLint 10 no longer reads
- Replaced `any` with `unknown` in `isValid` and `isEqual` signatures and removed a redundant cast in `getDiff` (`src/index.ts`)

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
