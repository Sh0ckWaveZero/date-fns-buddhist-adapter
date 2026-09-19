import { Box, Typography, alpha, useTheme } from '@mui/material'
import type { ReactElement } from 'react'
import {
  format,
  getDate,
  isSameMonth,
  isToday,
  isWithinInterval,
} from 'date-fns'
import type { Day as DayIndex, Locale } from 'date-fns'

import type { DateRange } from '../types'
import { NavigationAction } from '../types'
import {
  chunks,
  getDaysInMonth,
  inDateRange,
  isEndOfRange,
  isRangeSameDay,
  isStartOfRange,
} from '../utils'
import { Day } from './Day'
import { MonthHeader } from './MonthHeader'

type MonthProps = {
  currentDate: Date
  otherDate: Date
  marker: symbol
  dateRange: DateRange
  minDate: Date
  maxDate: Date
  navState: [boolean, boolean]
  setMonth: (date: Date) => void
  helpers: {
    isInHoverRange: (day: Date) => boolean
  }
  handlers: {
    handleClickDateNumber: (day: Date) => void
    handleHoverDateNumber: (day: Date) => void
    handleClickNavIcon: (marker: symbol, action: NavigationAction) => void
  }
  locale?: Locale
  buddhistEra?: boolean
  hideOutsideMonthDays?: boolean
}

export const Month = (props: MonthProps): ReactElement => {
  const theme = useTheme()
  const {
    helpers,
    handlers,
    currentDate,
    dateRange,
    marker,
    setMonth,
    minDate,
    maxDate,
    locale,
    buddhistEra,
    hideOutsideMonthDays,
  } = props

  const weekStartsOn = locale?.options?.weekStartsOn || 0
  const WEEK_DAYS = Array.from({ length: 7 }, (_, index) =>
    typeof locale !== 'undefined'
      ? (locale.localize?.day(((index + weekStartsOn) % 7) as DayIndex, {
          width: 'short',
          context: 'standalone',
        }) as string)
      : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index],
  )
  const [back, forward] = props.navState
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '55px',
          backgroundColor: alpha(theme.palette.grey[400], 0.1),
        }}
      >
        <MonthHeader
          minDate={minDate}
          maxDate={maxDate}
          currentDate={currentDate}
          setDate={setMonth}
          nextDisabled={!forward}
          prevDisabled={!back}
          onClickPrevious={() =>
            handlers.handleClickNavIcon(marker, NavigationAction.Previous)
          }
          onClickNext={() =>
            handlers.handleClickNavIcon(marker, NavigationAction.Next)
          }
          locale={locale}
          buddhistEra={buddhistEra}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          margin: '16px 24px 0 24px',
        }}
      >
        {WEEK_DAYS.map((day, index) => (
          <Box
            key={index}
            sx={{ display: 'flex', width: '36px', justifyContent: 'center' }}
          >
            <Typography
              sx={{
                color: 'text.secondary',
                fontSize: '12px',
              }}
            >
              {day}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          margin: '24px',
        }}
      >
        {chunks(getDaysInMonth(currentDate, locale), 7).map((week, idx) => (
          <Box
            key={idx}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            {week.map((day) => {
              const isStart = isStartOfRange(dateRange, day)
              const isEnd = isEndOfRange(dateRange, day)
              const isRangeOneDay = isRangeSameDay(dateRange)
              const highlighted =
                inDateRange(dateRange, day) || helpers.isInHoverRange(day)

              return (
                <Day
                  key={format(day, 'dd-MM-yyyy')}
                  filled={isStart || isEnd}
                  outlined={isToday(day)}
                  highlighted={highlighted && !isRangeOneDay}
                  disabled={
                    !isSameMonth(currentDate, day) ||
                    !(
                      isWithinInterval(day, { start: minDate, end: maxDate }) ||
                      isStartOfRange(
                        {
                          startDate: minDate,
                          endDate: maxDate,
                        },
                        day,
                      )
                    )
                  }
                  hidden={!isSameMonth(currentDate, day)}
                  hideOutsideMonthDays={hideOutsideMonthDays}
                  startOfRange={isStart && !isRangeOneDay}
                  endOfRange={isEnd && !isRangeOneDay}
                  onClick={() => handlers.handleClickDateNumber(day)}
                  onHover={() => handlers.handleHoverDateNumber(day)}
                  value={getDate(day)}
                />
              )
            })}
          </Box>
        ))}
      </Box>
    </Box>
  )
}
