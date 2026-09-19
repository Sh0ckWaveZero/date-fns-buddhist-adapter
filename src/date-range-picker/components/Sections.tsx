import {
  Box,
  Divider,
  FormControl,
  MenuItem,
  Select,
  Typography,
  alpha,
  useTheme,
} from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'
import { differenceInCalendarMonths } from 'date-fns'
import type { Locale } from 'date-fns'
import { useEffect, useState } from 'react'

import { ChevronDownIcon } from '../icons'
import type { DateRange, DefinedRange, Labels, Setter } from '../types'
import { NavigationAction } from '../types'
import { DualCalendar, SingleCalendar } from './Calendars'
import { DefinedRanges } from './DefinedRanges'
import { Footer } from './Footer'

type SectionsProps = {
  dateRange: DateRange
  ranges: DefinedRange[]
  minDate: Date
  maxDate: Date
  firstMonth: Date
  secondMonth: Date
  handleSetFirstMonth: (date: Date) => void
  handleSetSecondMonth: (date: Date) => void
  handleSetSingleMonth: (date: Date) => void
  handleClickDefinedRange: Setter<DateRange>
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
  labels?: Labels
  buddhistEra?: boolean

  hideActionButtons?: boolean
  hideDefaultRanges?: boolean
  hideOutsideMonthDays?: boolean
  onCloseCallback?: () => void
  footerRequired?: boolean
}

const isSameDayRange = (sd1: Date, ed1: Date, sd2: Date, ed2: Date) => {
  return (
    sd1.getDate() === sd2.getDate() &&
    sd1.getMonth() === sd2.getMonth() &&
    sd1.getFullYear() === sd2.getFullYear() &&
    ed1.getDate() === ed2.getDate() &&
    ed1.getMonth() === ed2.getMonth() &&
    ed1.getFullYear() === ed2.getFullYear()
  )
}

export const Sections = (props: SectionsProps) => {
  const theme = useTheme()
  const {
    dateRange,
    ranges,
    minDate,
    maxDate,
    firstMonth,
    secondMonth,
    handleSetFirstMonth,
    handleSetSecondMonth,
    handleSetSingleMonth,
    handleClickDefinedRange,
    helpers,
    handlers,
    locale,
    labels,
    buddhistEra,

    hideActionButtons = false,
    hideDefaultRanges = false,
    hideOutsideMonthDays,
    onCloseCallback,
    footerRequired,
  } = props

  const { startDate, endDate } = dateRange
  const canNavigateCloser =
    differenceInCalendarMonths(secondMonth, firstMonth) >= 2
  const commonProps = {
    dateRange,
    minDate,
    maxDate,
    helpers,
    handlers,
    locale,
    buddhistEra,
    hideOutsideMonthDays,
  }

  const [selectedRange, setSelectedRange] = useState('')
  const [selectedRangeObj, setSelectedRangeObj] = useState<
    DefinedRange | undefined
  >(undefined)

  const onChangeSelectedRange = (e: SelectChangeEvent<string>) => {
    const range = ranges.find((range) => range.label === e.target.value)

    if (range) {
      setSelectedRange(range.label)
      setSelectedRangeObj(range)
      handleClickDefinedRange(range)
    }
  }

  // Clear the quick-select highlight once the user picks dates manually
  useEffect(() => {
    if (selectedRangeObj && dateRange.startDate && dateRange.endDate) {
      const { startDate: sd1, endDate: ed1 } = dateRange
      const { startDate: sd2, endDate: ed2 } = selectedRangeObj

      if (sd1 && ed1 && sd2 && ed2) {
        if (isSameDayRange(sd1, ed1, sd2, ed2)) {
          return
        }
        setSelectedRange('')
      }
    }
  }, [selectedRangeObj, dateRange])

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        borderRadius: '16px',
        backgroundColor: theme.palette.background.paper,
        overflow: 'hidden',
      }}
    >
      {/* Defined Ranges Selection ( md+ ) */}
      <Box
        className="DRP-Defined-Ranges"
        sx={{
          display: {
            xs: 'none',
            md: hideDefaultRanges ? 'none' : 'flex',
          },
          flexDirection: 'column',
        }}
      >
        <DefinedRanges
          selectedRange={dateRange}
          ranges={ranges}
          setRange={handleClickDefinedRange}
        />
      </Box>

      {/* Divider for Defined Ranges ( md+ ) */}
      <Box
        sx={{
          display: {
            xs: 'none',
            md: hideDefaultRanges ? 'none' : 'block',
          },
        }}
      >
        <Divider orientation="vertical" />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Defined Ranges Selection ( xs only ) */}
        <Box
          sx={{
            display: {
              xs: hideDefaultRanges ? 'none' : 'flex',
              md: 'none',
            },
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '48px',
            px: '16px',
            backgroundColor: alpha(theme.palette.grey[400], 0.1),
          }}
        >
          <Typography
            sx={{
              fontSize: '14px',
            }}
          >
            {labels?.predefinedRanges || 'Quick Select'}
          </Typography>

          <FormControl>
            <Select
              displayEmpty
              variant="outlined"
              size="small"
              IconComponent={ChevronDownIcon}
              sx={{
                height: '30px',
                backgroundColor: theme.palette.background.paper,
                '& .MuiSelect-icon': {
                  color: theme.palette.grey[400],
                },
                '& .MuiSelect-select': {
                  minHeight: 'unset',
                  paddingBottom: '4px',
                  paddingTop: '4px',
                },
              }}
              MenuProps={{
                slotProps: {
                  paper: {
                    sx: {
                      width: 'auto',
                      maxHeight: '224px',
                    },
                  },
                },
              }}
              value={selectedRange}
              onChange={onChangeSelectedRange}
            >
              {ranges.map((range) => {
                return (
                  <MenuItem key={range.label} value={range.label}>
                    <Typography
                      sx={{
                        fontSize: '14px',
                      }}
                    >
                      {range.label}
                    </Typography>
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </Box>

        {/* Divider for Defined Ranges ( xs only ) */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <Divider />
        </Box>

        {/* Single Calender ( xs only ) */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <SingleCalendar
            firstMonth={firstMonth}
            secondMonth={secondMonth}
            handleSetSingleMonth={handleSetSingleMonth}
            canNavigateCloser={canNavigateCloser}
            commonProps={commonProps}
          />
        </Box>

        {/* Dual Calender ( md+ ) */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            flex: 1,
          }}
        >
          <DualCalendar
            firstMonth={firstMonth}
            secondMonth={secondMonth}
            handleSetFirstMonth={handleSetFirstMonth}
            handleSetSecondMonth={handleSetSecondMonth}
            canNavigateCloser={canNavigateCloser}
            commonProps={commonProps}
          />
        </Box>

        {/* Footer With Divider Section */}
        {footerRequired ? (
          <>
            <Box sx={{ display: hideActionButtons ? 'none' : 'block' }}>
              <Divider />
            </Box>

            <Box
              sx={{
                display: hideActionButtons ? 'none' : 'flex',
                alignItems: {
                  xs: 'normal',
                  md: 'center',
                },
                justifyContent: {
                  xs: 'center',
                  md: 'flex-end',
                },
                flexDirection: {
                  xs: 'column',
                  md: 'row',
                },
                p: '16px',
                gap: '16px',
              }}
            >
              <Footer
                startDate={startDate}
                endDate={endDate}
                locale={locale}
                labels={labels}
                buddhistEra={buddhistEra}
                onCloseCallback={onCloseCallback}
                onSubmit={handlers.handleClickSubmit}
              />
            </Box>
          </>
        ) : null}
      </Box>
    </Box>
  )
}
