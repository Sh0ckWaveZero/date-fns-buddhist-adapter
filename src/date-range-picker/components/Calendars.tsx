import { Box, Divider } from '@mui/material'
import type { ReactElement } from 'react'
import { isSameMonth } from 'date-fns'
import type { Locale } from 'date-fns'

import { MARKERS } from '../constants'
import type { DateRange } from '../types'
import { NavigationAction } from '../types'
import { Month } from './Month'

type CommonProps = {
  dateRange: DateRange
  minDate: Date
  maxDate: Date
  helpers: {
    isInHoverRange: (day: Date) => boolean
  }
  handlers: {
    handleClickDateNumber: (day: Date) => void
    handleClickSubmit: () => void
    handleHoverDateNumber: (day: Date) => void
    handleClickNavIcon: (marker: symbol, action: NavigationAction) => void
  }
  locale?: Locale
  buddhistEra?: boolean
  hideOutsideMonthDays?: boolean
}

type DualCalendarProps = {
  firstMonth: Date
  secondMonth: Date
  handleSetFirstMonth: (date: Date) => void
  handleSetSecondMonth: (date: Date) => void
  canNavigateCloser: boolean
  commonProps: CommonProps
}

export const DualCalendar = ({
  firstMonth,
  secondMonth,
  handleSetFirstMonth,
  handleSetSecondMonth,
  canNavigateCloser,
  commonProps,
}: DualCalendarProps): ReactElement => {
  const canNavigateBack = !isSameMonth(firstMonth, commonProps.minDate)
  const canNavigateForward = !isSameMonth(secondMonth, commonProps.maxDate)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column',
          md: 'row',
        },
        justifyContent: 'center',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Month
          dateRange={commonProps.dateRange}
          minDate={commonProps.minDate}
          maxDate={commonProps.maxDate}
          helpers={commonProps.helpers}
          handlers={commonProps.handlers}
          locale={commonProps.locale}
          buddhistEra={commonProps.buddhistEra}
          hideOutsideMonthDays={commonProps.hideOutsideMonthDays}
          currentDate={firstMonth}
          otherDate={secondMonth}
          setMonth={handleSetFirstMonth}
          navState={[canNavigateBack, canNavigateCloser]}
          marker={MARKERS.FIRST_MONTH as symbol}
        />
      </Box>

      <Box>
        <Divider orientation="vertical" />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Month
          dateRange={commonProps.dateRange}
          minDate={commonProps.minDate}
          maxDate={commonProps.maxDate}
          helpers={commonProps.helpers}
          handlers={commonProps.handlers}
          locale={commonProps.locale}
          buddhistEra={commonProps.buddhistEra}
          hideOutsideMonthDays={commonProps.hideOutsideMonthDays}
          currentDate={secondMonth}
          otherDate={firstMonth}
          setMonth={handleSetSecondMonth}
          navState={[canNavigateCloser, canNavigateForward]}
          marker={MARKERS.SECOND_MONTH as symbol}
        />
      </Box>
    </Box>
  )
}

type SingleCalendarProps = {
  firstMonth: Date
  secondMonth: Date
  handleSetSingleMonth: (date: Date) => void
  canNavigateCloser: boolean
  commonProps: CommonProps
}

export const SingleCalendar = ({
  firstMonth,
  secondMonth,
  handleSetSingleMonth,
  commonProps,
}: SingleCalendarProps): ReactElement => {
  const canNavigateBack = !isSameMonth(firstMonth, commonProps.minDate)
  const canNavigateForward = !isSameMonth(firstMonth, commonProps.maxDate)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column',
          md: 'row',
        },
        justifyContent: 'center',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Month
          dateRange={commonProps.dateRange}
          minDate={commonProps.minDate}
          maxDate={commonProps.maxDate}
          helpers={commonProps.helpers}
          handlers={commonProps.handlers}
          locale={commonProps.locale}
          buddhistEra={commonProps.buddhistEra}
          hideOutsideMonthDays={commonProps.hideOutsideMonthDays}
          currentDate={firstMonth}
          otherDate={secondMonth}
          setMonth={handleSetSingleMonth}
          navState={[canNavigateBack, canNavigateForward]}
          marker={MARKERS.SINGLE_MONTH as symbol}
        />
      </Box>
    </Box>
  )
}
