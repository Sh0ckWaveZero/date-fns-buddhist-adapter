# @midseelee/date-fns-buddhist-adapter

> Forked from [ascendcorp/date-fns-buddhist-adapter](https://github.com/ascendcorp/date-fns-buddhist-adapter)

date-fns adapter with Buddhist years functionality compatible with [MUI-X](https://github.com/mui/mui-x) date-picker.

## Installation

```shell
npm install @midseelee/date-fns-buddhist-adapter date-fns@4.4.0 @date-io/date-fns@3.2.1
# or
pnpm add @midseelee/date-fns-buddhist-adapter date-fns@4.4.0 @date-io/date-fns@3.2.1
# or
bun add @midseelee/date-fns-buddhist-adapter date-fns@4.4.0 @date-io/date-fns@3.2.1
```

## Peer Dependencies

This package requires the following peer dependencies:

- `@mui/material` ^9.4.0
- `@mui/x-date-pickers` ^9.14.0 (only if you use the MUI X Date Pickers adapter; the `date-range-picker` subpath works without it)
- `react` ^19.3.0

## Usage

```typescript
import { LocalizationProvider } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { th } from 'date-fns/locale'
import AdapterDateFns from '@midseelee/date-fns-buddhist-adapter'

function App() {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={th}
    >
      <DatePicker label="วันที่ (พ.ศ.)" />
    </LocalizationProvider>
  )
}
```

## Date Range Picker

A standalone, MUI-styled date range picker under the `date-range-picker` subpath (adapted from [mui-daterange-picker-plus](https://github.com/miyushan/mui-daterange-picker-plus)), with Buddhist Era rendering built in. It needs nothing beyond the package peers (`@mui/material`, `react`) — icons are inlined.

### Components

| Component     | When to use                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------------ |
| `PickerInput` | Basic usage — a read-only `TextField` with a calendar icon that opens the picker popover         |
| `PickerModal` | Custom trigger (button, chip, …) — anchored `Popover` on desktop, full-screen `Dialog` on mobile |
| `PickerBase`  | Always-visible inline picker for filter panels / dashboards; applies selections immediately      |

The value follows the [MUI controlled/uncontrolled convention](https://mui.com/x/react-date-pickers/date-range-picker/): the picker is **controlled** when the parent provides `value`, and **uncontrolled** when it manages its own state initialized by `defaultValue` (`initialDateRange` remains as a deprecated alias of `defaultValue`). Every selection is reported through `onChange` in both modes.

### Basic usage (`PickerInput`)

```tsx
import { useState } from 'react'
import { PickerInput } from '@midseelee/date-fns-buddhist-adapter/date-range-picker'
import type { DateRange } from '@midseelee/date-fns-buddhist-adapter/date-range-picker'

function Example() {
  const [range, setRange] = useState<DateRange>({})

  return (
    <PickerInput
      value={range}
      onChange={setRange}
      label="ช่วงวันที่"
      fullWidth
    />
  )
}
```

The field displays the selected range in Buddhist Era (`format`, default `'dd/MM/yyyy'`) with a `DD/MM/YYYY – DD/MM/YYYY` placeholder when empty, and opens the picker popover on click.

### `PickerModal`

#### Uncontrolled (`defaultValue`)

```tsx
import { useState } from 'react'
import { Button } from '@mui/material'
import { PickerModal } from '@midseelee/date-fns-buddhist-adapter/date-range-picker'
import type { DateRange } from '@midseelee/date-fns-buddhist-adapter/date-range-picker'

function Example() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  return (
    <>
      <Button onClick={(e) => setAnchorEl(e.currentTarget)}>
        Pick a range
      </Button>
      <PickerModal
        defaultValue={{ startDate: new Date(), endDate: undefined }}
        minDate="2026-01-01"
        modalProps={{
          open: Boolean(anchorEl),
          anchorEl,
          onClose: () => setAnchorEl(null),
        }}
        customProps={{
          onSubmit: (range: DateRange) => {
            console.log(range)
            setAnchorEl(null)
          },
          onCloseCallback: () => setAnchorEl(null),
        }}
      />
    </>
  )
}
```

#### Controlled (`value` + `onChange`)

```tsx
function Example() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [range, setRange] = useState<DateRange>({})

  return (
    <>
      <Button onClick={(e) => setAnchorEl(e.currentTarget)}>
        {range.startDate
          ? range.startDate.toLocaleDateString()
          : 'Pick a range'}
      </Button>
      <PickerModal
        value={range}
        onChange={setRange}
        modalProps={{
          open: Boolean(anchorEl),
          anchorEl,
          onClose: () => setAnchorEl(null),
        }}
        customProps={{
          onSubmit: () => setAnchorEl(null),
          onCloseCallback: () => setAnchorEl(null),
        }}
      />
    </>
  )
}
```

### Inline (`PickerBase`)

```tsx
import { PickerBase } from '@midseelee/date-fns-buddhist-adapter/date-range-picker'

function Filters() {
  const [range, setRange] = useState<DateRange>({})

  return (
    <PickerBase
      value={range}
      onChange={setRange}
      locale={th}
      hideOutsideMonthDays={false}
    />
  )
}
```

`PickerBase` renders no footer — every selection is committed through `onChange` immediately.

## Date Range Picker API

### Shared props (`PickerProps`)

Accepted by all three components.

| Prop                   | Type                         | Default                                | Description                                                                                                                                              |
| ---------------------- | ---------------------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`                | `DateRange`                  | —                                      | Controlled range. When provided the picker ignores its internal state and reports selections through `onChange`                                          |
| `defaultValue`         | `DateRange`                  | `{}`                                   | Initial range of the uncontrolled picker. Ignored when `value` is provided                                                                               |
| `initialDateRange`     | `DateRange`                  | —                                      | **Deprecated** alias of `defaultValue`                                                                                                                   |
| `onChange`             | `(range: DateRange) => void` | —                                      | Called on every selection: picking a start, completing a range, choosing a preset                                                                        |
| `minDate`              | `Date \| string`             | start of the year, 10 years back       | Earliest selectable day. ISO strings (e.g. `'2026-01-01'`) are parsed with date-fns                                                                      |
| `maxDate`              | `Date \| string`             | end of the year, 10 years ahead        | Latest selectable day                                                                                                                                    |
| `locale`               | `Locale` (date-fns)          | en-US                                  | Drives week start, weekday/month names and preset math                                                                                                   |
| `buddhistEra`          | `boolean`                    | `true`                                 | Render years as Buddhist Era (Christian + 543) in calendar headers, the footer preview and `PickerInput`. Internal `Date` values stay in Christian years |
| `definedRanges`        | `DefinedRange[]`             | `getDefaultRanges(new Date(), locale)` | Replaces the built-in quick-select presets                                                                                                               |
| `hideDefaultRanges`    | `boolean`                    | `false`                                | Removes the presets list / dropdown entirely                                                                                                             |
| `hideOutsideMonthDays` | `boolean`                    | `true`                                 | Renders days of neighboring months as invisible placeholders                                                                                             |

### `PickerInput` props

Extends the shared props.

| Prop          | Type                        | Default             | Description                                                                                          |
| ------------- | --------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------- |
| `format`      | `string`                    | `'dd/MM/yyyy'`      | date-fns display format applied to both ends of the range                                            |
| `separator`   | `string`                    | `'–'`               | Text rendered between the two dates                                                                  |
| `placeholder` | `string`                    | uppercased `format` | Placeholder of each empty end, e.g. `DD/MM/YYYY – DD/MM/YYYY`                                        |
| `label`       | `string`                    | —                   | `TextField` label                                                                                    |
| `size`        | `'small' \| 'medium'`       | `'small'`           | `TextField` density                                                                                  |
| `fullWidth`   | `boolean`                   | `false`             | Stretch to the container; default width is fixed (`315px`)                                           |
| `disabled`    | `boolean`                   | `false`             | Disables the field and blocks opening the picker                                                     |
| `modalProps`  | `Partial<PopoverProps>`     | —                   | Merged into the internal popover props; `open`, `anchorEl` and `onClose` are managed by the input    |
| `customProps` | `Partial<ModalCustomProps>` | —                   | Merged into the internal modal behavior; `onSubmit` / `onCloseCallback` close the popover by default |

### `PickerModal` props

Extends the shared props.

| Prop          | Type               | Description                                                                                                                                                                    |
| ------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `modalProps`  | `PopoverProps`     | Forwarded to the MUI `Popover` (desktop) — provide `open`, `anchorEl`, `onClose`. On mobile viewports only `open` / `onClose` are used, rendered inside a full-screen `Dialog` |
| `customProps` | `ModalCustomProps` | Modal behavior, see below                                                                                                                                                      |

`ModalCustomProps`:

| Prop                  | Type                         | Default                | Description                                                                                                           |
| --------------------- | ---------------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `onSubmit`            | `(range: DateRange) => void` | —                      | Called when the user presses Apply with a complete range                                                              |
| `onCloseCallback`     | `() => void`                 | —                      | Called when the user presses Cancel                                                                                   |
| `hideActionButtons`   | `boolean`                    | `false`                | Hides the footer Cancel/Apply buttons                                                                                 |
| `RangeSeparatorIcons` | `{ xs?, md? }`               | built-in double arrows | Icon components (`SvgIconProps`) between the footer date previews — `xs` below the `md` breakpoint, `md` from `md` up |

### `Labels`

Customize every picker text:

| Key                | Default          |
| ------------------ | ---------------- |
| `predefinedRanges` | `'Quick Select'` |
| `actions.apply`    | `'Apply'`        |
| `actions.cancel`   | `'Cancel'`       |
| `footer.startDate` | `'Start Date'`   |
| `footer.endDate`   | `'End Date'`     |

### Functions

```ts
getDefaultRanges(date?: Date, locale?: Locale): DefinedRange[]
```

Returns the built-in presets — `Today`, `Yesterday`, `This Week`, `Last Week`, `Last 7 Days`, `This Month`, `Last Month`, `This Year`, `Last Year` — computed from `date` and the locale's week start. Labels are **localized by the locale's code** when supported (Thai `th` → `วันนี้`, `เมื่อวาน`, `สัปดาห์นี้`, `สัปดาห์ที่แล้ว`, `7 วันล่าสุด`, `เดือนนี้`, `เดือนที่แล้ว`, `ปีนี้`, `ปีที่แล้ว`); other locales fall back to English. Useful as a base when adding custom ranges.

### Types

```ts
type DateRange = {
  startDate?: Date
  endDate?: Date
}

type DefinedRange = {
  startDate: Date
  endDate: Date
  label: string
}
```

All `Date` values are plain Christian-year `Date` objects; Buddhist Era is rendering-only.

(`Marker`, `Setter` and `NavigationAction` are also exported from the subpath for advanced use — they describe calendar markers and navigation directions and are rarely needed directly.)

### Behavior notes

- The first click sets the start date, the second click completes the range (clicking before the start restarts the selection); presets commit instantly.
- A controlled picker opens on the month of its `value`; an uncontrolled one on `defaultValue`'s month or the current month.
- Days outside `minDate` / `maxDate` are disabled and the month navigation is clamped.
- `PickerModal` switches to a full-screen `Dialog` below the `md` breakpoint.

### Recipes

Thai labels and locale:

```tsx
import { th } from 'date-fns/locale'

function Example() {
  return (
    <PickerInput
      value={range}
      onChange={setRange}
      locale={th}
      labels={{
        predefinedRanges: 'ช่วงเวลายอดนิยม',
        actions: { apply: 'ตกลง', cancel: 'ยกเลิก' },
        footer: { startDate: 'วันเริ่มต้น', endDate: 'วันสิ้นสุด' },
      }}
    />
  )
}
```

Custom quick-select presets:

```tsx
import { addDays, endOfMonth, startOfMonth } from 'date-fns'

function Example() {
  const today = new Date()
  const definedRanges: DefinedRange[] = [
    { label: '7 วันล่าสุด', startDate: addDays(today, -6), endDate: today },
    {
      label: 'เดือนนี้',
      startDate: startOfMonth(today),
      endDate: endOfMonth(today),
    },
  ]

  return (
    <PickerModal
      value={range}
      onChange={setRange}
      definedRanges={definedRanges}
      modalProps={/* … */}
      customProps={/* … */}
    />
  )
}
```

Christian years instead of Buddhist Era:

```tsx
function Example() {
  return (
    <PickerInput
      value={range}
      onChange={setRange}
      buddhistEra={false}
      format="yyyy-MM-dd"
    />
  )
}
```

## Credits

This package is forked from [ascendcorp/date-fns-buddhist-adapter](https://github.com/ascendcorp/date-fns-buddhist-adapter)

### Special Thanks

1. [Ascendcorp](https://github.com/ascendcorp) - Original implementation
2. [mui-x](https://github.com/mui/mui-x) - MUI X Date Pickers
3. [date-fns-be](https://github.com/tarzui/date-fns-be) - Buddhist Era utilities

## License

MIT License

- Copyright (c) 2023 Ascendcorp (original)
- Copyright (c) 2025 midseelee (fork modifications)
