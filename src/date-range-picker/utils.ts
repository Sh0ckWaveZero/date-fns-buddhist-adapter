import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  getYear,
  isBefore,
  isSameDay,
  isSameMonth,
  isWithinInterval,
  isValid,
  max,
  min,
  parseISO,
  startOfMonth,
  startOfWeek,
} from 'date-fns'
import type { Locale } from 'date-fns'

import { BUDDHIST_ERA_OFFSET } from './constants'
import type { DateRange } from './types'

/**
 * Returns an array of chunks of the given size by splitting the input array
 */
export const chunks = <T>(array: ReadonlyArray<T>, size: number): T[][] =>
  Array.from({ length: Math.ceil(array.length / size) }, (_v, i) =>
    array.slice(i * size, i * size + size),
  )

/**
 * Returns an array of days covering every week that intersects the given month
 */
export const getDaysInMonth = (date: Date, locale?: Locale) => {
  const startWeek = startOfWeek(startOfMonth(date), { locale })
  const endWeek = endOfWeek(endOfMonth(date), { locale })
  const days: Date[] = []
  for (let curr = startWeek; isBefore(curr, endWeek);) {
    days.push(curr)
    curr = addDays(curr, 1)
  }
  return days
}

/**
 * Checks if a given day is the start of the date range
 */
export const isStartOfRange = ({ startDate }: DateRange, day: Date) =>
  (startDate && isSameDay(day, startDate)) as boolean

/**
 * Checks if a given day is the end of the date range
 */
export const isEndOfRange = ({ endDate }: DateRange, day: Date) =>
  (endDate && isSameDay(day, endDate)) as boolean

/**
 * Checks if a given day is inside the date range
 */
export const inDateRange = ({ startDate, endDate }: DateRange, day: Date) =>
  (startDate &&
    endDate &&
    (isWithinInterval(day, { start: startDate, end: endDate }) ||
      isSameDay(day, startDate) ||
      isSameDay(day, endDate))) as boolean

/**
 * Checks if the range starts and ends on the same day
 */
export const isRangeSameDay = ({ startDate, endDate }: DateRange) => {
  if (startDate && endDate) {
    return isSameDay(startDate, endDate)
  }
  return false
}

/**
 * Parse a date string or return the default value when invalid
 */
export const parseOptionalDate = (
  date: Date | string | null | undefined,
  defaultValue: Date,
) => {
  if (date) {
    const parsed = date instanceof Date ? date : parseISO(date)
    if (isValid(parsed)) return parsed
  }
  return defaultValue
}

/**
 * Get the validated [firstMonth, secondMonth] based on minDate, maxDate and the given range
 */
export const getValidatedMonths = (
  range: DateRange,
  minDate: Date,
  maxDate: Date,
) => {
  const { startDate, endDate } = range
  if (startDate && endDate) {
    const newStart = max([startDate, minDate])
    const newEnd = min([endDate, maxDate])

    return [
      newStart,
      isSameMonth(newStart, newEnd) ? addMonths(newStart, 1) : newEnd,
    ]
  }
  return [startDate, endDate]
}

export const toBuddhistYear = (year: number) => year + BUDDHIST_ERA_OFFSET

/**
 * Format a date with date-fns, rendering the year in Buddhist Era when enabled.
 * Mirrors the year substitution of the adapter's `formatByString`.
 */
export const formatWithEra = (
  date: Date,
  formatString: string,
  options?: {
    locale?: Locale
    buddhistEra?: boolean
  },
) => {
  const { locale, buddhistEra = true } = options ?? {}
  const formatted = format(date, formatString, { locale })

  if (!buddhistEra) {
    return formatted
  }

  const christianYear = `${getYear(date)}`
  const buddhistYear = `${toBuddhistYear(getYear(date))}`
  return formatted.replace(christianYear, buddhistYear)
}
