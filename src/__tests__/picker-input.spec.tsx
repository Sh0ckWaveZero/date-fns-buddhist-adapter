import { ThemeProvider, createTheme } from '@mui/material'
import { fireEvent, render, screen } from '@testing-library/react'
import { useState } from 'react'

import { PickerInput } from '../date-range-picker/PickerInput'
import type { DateRange } from '../date-range-picker/types'

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>)

const dayButton = (day: number, calendar = 0) =>
  screen.getAllByRole('button', { name: `${day}` })[calendar]

const PLACEHOLDER = 'DD/MM/YYYY – DD/MM/YYYY'

/** Selected dates render with the picker's dd/MM/yyyy Buddhist Era format */
const expectedValue = (startDay: number, endDay: number) => {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = now.getFullYear() + 543
  return `${startDay}/${month}/${year} – ${endDay}/${month}/${year}`
}

describe('PickerInput', () => {
  it('shows the placeholder when empty and opens on click', () => {
    renderWithTheme(<PickerInput />)
    const input = screen.getByPlaceholderText(PLACEHOLDER)
    expect(input).toBeTruthy()

    fireEvent.click(input)
    expect(screen.getAllByRole('button', { name: 'Apply' }).length).toEqual(1)
  })

  it('renders a controlled value in Buddhist Era and follows value updates', () => {
    const onChange = jest.fn()
    const { rerender } = renderWithTheme(
      <PickerInput
        value={{ startDate: new Date(2026, 8, 15), endDate: undefined }}
        onChange={onChange}
      />,
    )
    expect(
      screen.getByDisplayValue('15/09/2569 – DD/MM/YYYY'),
    ).toBeTruthy()

    rerender(
      <ThemeProvider theme={createTheme()}>
        <PickerInput
          value={{
            startDate: new Date(2026, 8, 15),
            endDate: new Date(2026, 8, 22),
          }}
          onChange={onChange}
        />
      </ThemeProvider>,
    )
    expect(screen.getByDisplayValue('15/09/2569 – 22/09/2569')).toBeTruthy()
  })

  it('updates its own display when uncontrolled', () => {
    renderWithTheme(<PickerInput />)
    fireEvent.click(screen.getByPlaceholderText(PLACEHOLDER))
    fireEvent.click(dayButton(10))
    fireEvent.click(dayButton(20))
    fireEvent.click(screen.getByRole('button', { name: 'Apply' }))

    expect(screen.getByDisplayValue(expectedValue(10, 20))).toBeTruthy()
  })

  it('keeps working as a fully controlled field', () => {
    const Host = () => {
      const [value, setValue] = useState<DateRange>({})
      return <PickerInput value={value} onChange={setValue} label="ช่วงวันที่" />
    }

    renderWithTheme(<Host />)
    fireEvent.click(screen.getByLabelText('ช่วงวันที่'))
    fireEvent.click(dayButton(10))
    fireEvent.click(dayButton(20))
    fireEvent.click(screen.getByRole('button', { name: 'Apply' }))

    expect(screen.getByDisplayValue(expectedValue(10, 20))).toBeTruthy()
  })
})
