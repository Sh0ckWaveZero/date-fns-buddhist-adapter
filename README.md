# @midseelee/date-fns-buddhist-adapter

> Forked from [ascendcorp/date-fns-buddhist-adapter](https://github.com/ascendcorp/date-fns-buddhist-adapter)

date-fns adapter with Buddhist years functionality compatible with [MUI-X](https://github.com/mui/mui-x) date-picker.

## Installation

```shell
npm install @midseelee/date-fns-buddhist-adapter
# or
pnpm add @midseelee/date-fns-buddhist-adapter
# or
bun add @midseelee/date-fns-buddhist-adapter
```

## Usage

```typescript
import AdapterDateFns from '@midseelee/date-fns-buddhist-adapter'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { thTH } from 'date-fns/locale/th-TH'

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={thTH}>
      <DatePicker />
    </LocalizationProvider>
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
