import { ThemeProvider, createTheme } from '@mui/material'
import { fireEvent, render, screen } from '@testing-library/react'
import { useState } from 'react'

import { PickerBase } from '../date-range-picker/PickerBase'
import { PickerModal } from '../date-range-picker/PickerModal'
import type { DateRange } from '../date-range-picker/types'

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>)

/**
 * Day buttons for the 8th-24th are unique per calendar (outside-month days
 * only ever cover days 1-7 and 25-31), so the nth match is the nth calendar:
 * index 0 = first month, index 1 = second month.
 */
const dayButton = (day: number, calendar = 0) =>
  screen.getAllByRole('button', { name: `${day}` })[calendar]

const clickDay = (day: number, calendar = 0) =>
  fireEvent.click(dayButton(day, calendar))

describe('PickerBase controlled / uncontrolled value', () => {
  describe('uncontrolled', () => {
    it('seeds internal state from defaultValue', () => {
      const onChange = jest.fn()
      renderWithTheme(
        <PickerBase
          defaultValue={{ startDate: new Date(2026, 0, 10) }}
          onChange={onChange}
        />,
      )

      clickDay(24)

      expect(onChange).toHaveBeenLastCalledWith({
        startDate: new Date(2026, 0, 10),
        endDate: new Date(2026, 0, 24),
      })
    })

    it('keeps advancing internal state across selections', () => {
      const onChange = jest.fn()
      renderWithTheme(
        <PickerBase
          defaultValue={{ startDate: new Date(2026, 0, 10) }}
          onChange={onChange}
        />,
      )

      clickDay(24)
      clickDay(12)

      expect(onChange).toHaveBeenLastCalledWith({
        startDate: new Date(2026, 0, 12),
        endDate: undefined,
      })
    })

    it('still seeds state from the deprecated initialDateRange alias', () => {
      const onChange = jest.fn()
      renderWithTheme(
        <PickerBase
          initialDateRange={{ startDate: new Date(2026, 0, 10) }}
          onChange={onChange}
        />,
      )

      clickDay(24)

      expect(onChange).toHaveBeenLastCalledWith({
        startDate: new Date(2026, 0, 10),
        endDate: new Date(2026, 0, 24),
      })
    })
  })

  describe('controlled', () => {
    it('reports selections through onChange but ignores internal state', () => {
      const onChange = jest.fn()
      renderWithTheme(
        <PickerBase
          value={{
            startDate: new Date(2026, 0, 10),
            endDate: new Date(2026, 0, 20),
          }}
          onChange={onChange}
        />,
      )

      clickDay(15)
      clickDay(22)

      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenNthCalledWith(1, {
        startDate: new Date(2026, 0, 15),
        endDate: undefined,
      })
      // The second click still restarts from the unchanged `value`, proving
      // the picker never accumulated its own state
      expect(onChange).toHaveBeenNthCalledWith(2, {
        startDate: new Date(2026, 0, 22),
        endDate: undefined,
      })
    })

    it('ignores defaultValue when value is provided', () => {
      const onChange = jest.fn()
      renderWithTheme(
        <PickerBase
          value={{}}
          defaultValue={{ startDate: new Date(2026, 0, 10) }}
          onChange={onChange}
        />,
      )

      clickDay(24)

      expect(onChange).toHaveBeenLastCalledWith({
        startDate: new Date(2026, 0, 24),
        endDate: undefined,
      })
    })

    it('follows parent updates of value', () => {
      const Host = ({ onChange }: { onChange: (range: DateRange) => void }) => {
        const [value, setValue] = useState<DateRange>({})
        return (
          <PickerBase
            value={value}
            onChange={(range) => {
              setValue(range)
              onChange(range)
            }}
          />
        )
      }
      const onChange = jest.fn()
      renderWithTheme(<Host onChange={onChange} />)

      clickDay(15)
      clickDay(22)

      const now = new Date()
      expect(onChange).toHaveBeenNthCalledWith(2, {
        startDate: new Date(now.getFullYear(), now.getMonth(), 15),
        endDate: new Date(now.getFullYear(), now.getMonth(), 22),
      })
    })
  })
})

describe('PickerModal', () => {
  it('commits the selected range on Apply', () => {
    const onSubmit = jest.fn()
    renderWithTheme(
      <PickerModal
        modalProps={{ open: true, anchorEl: document.body }}
        customProps={{ onSubmit }}
      />,
    )

    clickDay(10)
    clickDay(20)
    fireEvent.click(screen.getByRole('button', { name: 'Apply' }))

    const now = new Date()
    expect(onSubmit).toHaveBeenCalledWith({
      startDate: new Date(now.getFullYear(), now.getMonth(), 10),
      endDate: new Date(now.getFullYear(), now.getMonth(), 20),
    })
  })
})
