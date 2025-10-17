# Buddhist Date Adapter Example

Live example demonstrating how to use `@midseelee/date-fns-buddhist-adapter` with MUI X Date Pickers.

## Features

- 🇹🇭 Buddhist Era (BE) calendar support
- 📅 MUI X DatePicker integration
- ⚡ React 19 + Vite + TypeScript
- 🎨 Material-UI design system
- 🌏 Thai locale support

## Getting Started

### Install Dependencies

```bash
# Using npm
npm install

# Using bun
bun install
```

### Run Development Server

```bash
# Using npm
npm run dev

# Using bun
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the example.

## What's Included

- **Buddhist Year Display**: Automatically converts CE years to BE (+543)
- **Date Picker**: Full-featured MUI X DatePicker with Thai locale
- **Date Information**: Shows selected date in both BE and CE formats
- **Usage Examples**: Code snippets showing how to integrate the adapter

## Key Features Demonstrated

1. **LocalizationProvider Setup**
   ```tsx
   <LocalizationProvider
     dateAdapter={AdapterDateFns}
     adapterLocale={thLocale}
   >
   ```

2. **Buddhist Year Conversion**
   - Input: User selects date in BE format (พ.ศ.)
   - Storage: Internally stores as standard Date object
   - Display: Shows BE year in picker and formatted strings

3. **Thai Locale Integration**
   - Thai month names
   - Thai day names
   - Buddhist calendar display

## Learn More

- [MUI X Date Pickers](https://mui.com/x/react-date-pickers/)
- [date-fns Documentation](https://date-fns.org/)
- [Buddhist Calendar](https://en.wikipedia.org/wiki/Buddhist_calendar)
