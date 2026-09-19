import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'
import { getMonth, getYear, setMonth, setYear } from 'date-fns'
import type { Locale, Month as MonthIndex } from 'date-fns'

import { BUDDHIST_ERA_OFFSET } from '../constants'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '../icons'
import { toBuddhistYear } from '../utils'

type MonthHeaderProps = {
  minDate: Date
  maxDate: Date
  currentDate: Date
  setDate: (date: Date) => void
  nextDisabled: boolean
  prevDisabled: boolean
  onClickNext: () => void
  onClickPrevious: () => void
  locale?: Locale
  buddhistEra?: boolean
}

const generateYears = ({ start, end }: { start: number; end: number }) => {
  const count = end - start + 1

  return Array(count)
    .fill(0)
    .map((_y, i) => start + i)
}

const menuSx = {
  width: 'auto',
  maxHeight: '224px',
} as const

export const MonthHeader = ({
  minDate,
  maxDate,
  currentDate,
  setDate,
  nextDisabled,
  prevDisabled,
  onClickNext,
  onClickPrevious,
  locale,
  buddhistEra = true,
}: MonthHeaderProps) => {
  const theme = useTheme()

  const availableYearRange = {
    start: minDate.getFullYear(),
    end: maxDate.getFullYear(),
  }

  const MONTHS = Array.from({ length: 12 }, (_, index) =>
    typeof locale !== 'undefined'
      ? (locale.localize?.month(index as MonthIndex, {
          width: 'abbreviated',
          context: 'standalone',
        }) as string)
      : [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ][index],
  )

  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    setDate(setMonth(currentDate, parseInt(String(event.target.value), 10)))
  }

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    const selectedYear = parseInt(String(event.target.value), 10)
    setDate(
      setYear(
        currentDate,
        buddhistEra ? selectedYear - BUDDHIST_ERA_OFFSET : selectedYear,
      ),
    )
  }

  const currentMonth = getMonth(currentDate)
  const currentYear = getYear(currentDate)

  const minYear = getYear(minDate)
  const maxYear = getYear(maxDate)
  const minMonthID = getMonth(minDate)
  const maxMonthID = getMonth(maxDate)

  const isDisabled = (month: number) => {
    // validations for out of given range
    if (currentYear === minYear || currentYear === maxYear) {
      if (currentYear === minYear && month < minMonthID) {
        return true
      }
      if (currentYear === maxYear && month > maxMonthID) {
        return true
      }
    }

    return false
  }

  const selectSx = {
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
  } as const

  return (
    <>
      <Box sx={{ ml: '10px' }}>
        <IconButton
          disableRipple
          size="small"
          disabled={prevDisabled}
          onClick={onClickPrevious}
          sx={{
            borderRadius: '8px',
            color: theme.palette.grey[600],
            '&:hover': {
              backgroundColor: theme.palette.grey[100],
            },
            '&.Mui-disabled': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <ChevronLeftIcon
            fontSize="small"
            sx={{
              color: prevDisabled
                ? theme.palette.grey[400]
                : theme.palette.grey[600],
            }}
          />
        </IconButton>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <FormControl>
          <Select
            variant="outlined"
            size="small"
            IconComponent={ChevronDownIcon}
            sx={{ ...selectSx, width: { xs: '110px', md: '120px' } }}
            MenuProps={{
              slotProps: {
                paper: {
                  sx: menuSx,
                },
              },
            }}
            value={currentMonth}
            onChange={handleMonthChange}
          >
            {MONTHS.map((month, idx) => {
              return (
                <MenuItem key={month} value={idx} disabled={isDisabled(idx)}>
                  <Typography
                    noWrap
                    sx={{
                      fontSize: '14px',
                    }}
                  >
                    {month}
                  </Typography>
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>

        <FormControl>
          <Select
            variant="outlined"
            size="small"
            IconComponent={ChevronDownIcon}
            sx={{ ...selectSx, width: { xs: '100px', md: '110px' } }}
            MenuProps={{
              slotProps: {
                paper: {
                  sx: menuSx,
                },
              },
            }}
            value={buddhistEra ? toBuddhistYear(currentYear) : currentYear}
            onChange={handleYearChange}
          >
            {generateYears(availableYearRange).map((year) => {
              const displayYear = buddhistEra ? toBuddhistYear(year) : year
              return (
                <MenuItem key={year} value={displayYear}>
                  <Typography
                    sx={{
                      fontSize: '14px',
                    }}
                  >
                    {displayYear}
                  </Typography>
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ mr: '10px' }}>
        <IconButton
          disableRipple
          size="small"
          disabled={nextDisabled}
          onClick={onClickNext}
          sx={{
            borderRadius: '8px',
            color: theme.palette.grey[600],
            '&:hover': {
              backgroundColor: theme.palette.grey[100],
            },
            '&.Mui-disabled': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <ChevronRightIcon
            fontSize="small"
            sx={{
              color: nextDisabled
                ? theme.palette.grey[400]
                : theme.palette.grey[600],
            }}
          />
        </IconButton>
      </Box>
    </>
  )
}
