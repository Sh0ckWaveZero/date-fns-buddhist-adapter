import { th } from 'date-fns/locale'

import {
  BUDDHIST_ERA_OFFSET,
  AVAILABLE_MAX_DATE,
  AVAILABLE_MIN_DATE,
} from '../date-range-picker/constants'
import { getDefaultRanges } from '../date-range-picker/defaults'
import {
  chunks,
  formatWithEra,
  getDaysInMonth,
  getValidatedMonths,
  inDateRange,
  isEndOfRange,
  isRangeSameDay,
  isStartOfRange,
  parseOptionalDate,
  toBuddhistYear,
} from '../date-range-picker/utils'

describe('date-range-picker utils', () => {
  describe('chunks', () => {
    it('splits an array into chunks of the given size', () => {
      expect(chunks([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
    })
  })

  describe('getDaysInMonth', () => {
    it('returns whole weeks covering the month', () => {
      const days = getDaysInMonth(new Date(2026, 8, 15)) // September 2026
      expect(days.length % 7).toEqual(0)
      expect(days.length).toBeGreaterThanOrEqual(28)
    })

    it('starts on the locale week start', () => {
      const days = getDaysInMonth(new Date(2026, 8, 15), th)
      expect(days[0].getDay()).toEqual(th.options?.weekStartsOn ?? 0)
    })
  })

  describe('range predicates', () => {
    const start = new Date(2026, 8, 1)
    const end = new Date(2026, 8, 10)
    const range = { startDate: start, endDate: end }

    it('isStartOfRange matches the start day only', () => {
      expect(isStartOfRange(range, start)).toEqual(true)
      expect(isStartOfRange(range, new Date(2026, 8, 2))).toEqual(false)
    })

    it('isEndOfRange matches the end day only', () => {
      expect(isEndOfRange(range, end)).toEqual(true)
      expect(isEndOfRange(range, new Date(2026, 8, 9))).toEqual(false)
    })

    it('inDateRange matches days inside and on the boundaries', () => {
      expect(inDateRange(range, new Date(2026, 8, 5))).toEqual(true)
      expect(inDateRange(range, start)).toEqual(true)
      expect(inDateRange(range, end)).toEqual(true)
      expect(inDateRange(range, new Date(2026, 8, 11))).toEqual(false)
    })

    it('isRangeSameDay detects single-day ranges', () => {
      expect(
        isRangeSameDay({ startDate: start, endDate: start }),
      ).toEqual(true)
      expect(isRangeSameDay(range)).toEqual(false)
      expect(isRangeSameDay({})).toEqual(false)
    })
  })

  describe('parseOptionalDate', () => {
    it('returns the date when valid', () => {
      const date = new Date(2026, 0, 15)
      expect(parseOptionalDate(date, AVAILABLE_MIN_DATE)).toEqual(date)
    })

    it('parses ISO strings', () => {
      expect(parseOptionalDate('2026-01-15', AVAILABLE_MIN_DATE)).toEqual(
        new Date(2026, 0, 15),
      )
    })

    it('falls back to the default value when invalid', () => {
      expect(parseOptionalDate('not-a-date', AVAILABLE_MIN_DATE)).toEqual(
        AVAILABLE_MIN_DATE,
      )
      expect(parseOptionalDate(undefined, AVAILABLE_MAX_DATE)).toEqual(
        AVAILABLE_MAX_DATE,
      )
    })
  })

  describe('getValidatedMonths', () => {
    it('clamps the range to min/max dates', () => {
      const minDate = new Date(2026, 0, 1)
      const maxDate = new Date(2026, 11, 31)
      const [first, second] = getValidatedMonths(
        {
          startDate: new Date(2020, 0, 1),
          endDate: new Date(2030, 0, 1),
        },
        minDate,
        maxDate,
      )
      expect(first).toEqual(minDate)
      expect(second).toEqual(maxDate)
    })

    it('separates months when start and end share a month', () => {
      const [first, second] = getValidatedMonths(
        {
          startDate: new Date(2026, 8, 1),
          endDate: new Date(2026, 8, 10),
        },
        AVAILABLE_MIN_DATE,
        AVAILABLE_MAX_DATE,
      )
      expect(first!.getMonth()).toEqual(8)
      expect(second!.getMonth()).toEqual(9)
    })
  })

  describe('Buddhist era helpers', () => {
    it('toBuddhistYear adds the era offset', () => {
      expect(toBuddhistYear(2026)).toEqual(2026 + BUDDHIST_ERA_OFFSET)
      expect(BUDDHIST_ERA_OFFSET).toEqual(543)
    })

    it('formatWithEra renders Buddhist years by default', () => {
      expect(formatWithEra(new Date(2026, 8, 19), 'dd/MM/yyyy')).toEqual(
        '19/09/2569',
      )
    })

    it('formatWithEra can keep Christian years', () => {
      expect(
        formatWithEra(new Date(2026, 8, 19), 'dd/MM/yyyy', {
          buddhistEra: false,
        }),
      ).toEqual('19/09/2026')
    })

    it('formatWithEra applies the locale', () => {
      expect(
        formatWithEra(new Date(2026, 8, 19), 'dd MMMM yyyy', {
          locale: th,
          buddhistEra: true,
        }),
      ).toEqual('19 กันยายน 2569')
    })
  })

  describe('getDefaultRanges', () => {
    it('localizes preset labels by locale code', () => {
      const ranges = getDefaultRanges(new Date(2026, 8, 19), th)
      expect(ranges.map((range) => range.label)).toEqual([
        'วันนี้',
        'เมื่อวาน',
        'สัปดาห์นี้',
        'สัปดาห์ที่แล้ว',
        '7 วันล่าสุด',
        'เดือนนี้',
        'เดือนที่แล้ว',
        'ปีนี้',
        'ปีที่แล้ว',
      ])
      expect(ranges[0].startDate).toEqual(new Date(2026, 8, 19))
    })

    it('falls back to English labels without a known locale', () => {
      const ranges = getDefaultRanges(new Date(2026, 8, 19))
      expect(ranges.map((range) => range.label)).toEqual([
        'Today',
        'Yesterday',
        'This Week',
        'Last Week',
        'Last 7 Days',
        'This Month',
        'Last Month',
        'This Year',
        'Last Year',
      ])
    })
  })
})
