import { th } from 'date-fns/locale'
import AdapterDateFns from '..'

describe('AdapterDateFns', () => {
  describe('Default locale (en-US with Buddhist calendar)', () => {
    const adapter = new AdapterDateFns()
    let date: Date

    beforeEach(() => {
      // Use local time to avoid timezone conversion issues
      date = new Date(2023, 5, 10, 6, 44, 0) // June 10, 2023 06:44:00
    })

    describe('Locale configuration', () => {
      it('should return correct locale code', () => {
        expect(adapter.getCurrentLocaleCode()).toEqual('th-Th')
      })

      it('should use 12-hour cycle in current locale', () => {
        expect(adapter.is12HourCycleInCurrentLocale()).toEqual(true)
      })

      it('should identify as MUI adapter', () => {
        expect(adapter.isMUIAdapter).toEqual(true)
      })

      it('should report correct library name', () => {
        expect(adapter.lib).toEqual('date-fns-buddhist')
      })
    })

    describe('Weekday handling', () => {
      it('should start week on Sunday', () => {
        const result = adapter.getWeekdays()
        expect(result).toStrictEqual(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'])
      })

      it('should get week array starting on Sunday', () => {
        const result = adapter.getWeekArray(date)
        expect(adapter.formatByString(result[0][0], 'EEEEEE')).toEqual('Su')
      })

      it('should return correct day of week', () => {
        expect(adapter.getDayOfWeek(date)).toEqual(6) // Saturday
      })
    })

    describe('Date formatting with Buddhist year conversion', () => {
      it('should format fullDate correctly', () => {
        expect(adapter.format(date, 'fullDate')).toEqual('Jun 10, 2566')
      })

      it('should format fullDateWithWeekday correctly', () => {
        expect(adapter.format(date, 'fullDateWithWeekday')).toEqual('Saturday, June 10th, 2566')
      })

      it('should format fullDateTime correctly', () => {
        expect(adapter.format(date, 'fullDateTime')).toEqual('Jun 10, 2566 6:44 AM')
      })

      it('should format fullDateTime12h correctly', () => {
        expect(adapter.format(date, 'fullDateTime12h')).toEqual('Jun 10, 2566 06:44 am')
      })

      it('should format fullDateTime24h correctly', () => {
        expect(adapter.format(date, 'fullDateTime24h')).toEqual('Jun 10, 2566 06:44')
      })

      it('should format keyboardDate correctly', () => {
        expect(adapter.format(date, 'keyboardDate')).toEqual('06/10/2566')
      })

      it('should format keyboardDateTime correctly', () => {
        expect(adapter.format(date, 'keyboardDateTime')).toEqual('06/10/2566 6:44 AM')
      })

      it('should format keyboardDateTime12h correctly', () => {
        expect(adapter.format(date, 'keyboardDateTime12h')).toEqual('06/10/2566 06:44 am')
      })

      it('should format keyboardDateTime24h correctly', () => {
        expect(adapter.format(date, 'keyboardDateTime24h')).toEqual('06/10/2566 06:44')
      })

      it('should format year correctly', () => {
        expect(adapter.format(date, 'year')).toEqual('2566')
      })
    })

    describe('Date parsing with Buddhist year conversion', () => {
      it('should parse Buddhist year date (dd/MM/yyyy)', () => {
        const parsed = adapter.parse('10/06/2566', 'dd/MM/yyyy')
        expect(parsed).toBeInstanceOf(Date)
        expect(adapter.getYear(parsed!)).toEqual(2023)
        expect(adapter.getMonth(parsed!)).toEqual(5) // June (0-indexed)
        expect(adapter.getDate(parsed!)).toEqual(10)
      })

      it('should parse Christian year date (dd/MM/yyyy)', () => {
        const parsed = adapter.parse('10/06/0500', 'dd/MM/yyyy')
        expect(parsed).toBeInstanceOf(Date)
        expect(adapter.getYear(parsed!)).toEqual(500)
      })

      it('should parse Buddhist year (MM/yyyy)', () => {
        const parsed = adapter.parse('06/2566', 'MM/yyyy')
        expect(parsed).toBeInstanceOf(Date)
        expect(adapter.getYear(parsed!)).toEqual(2023)
        expect(adapter.getMonth(parsed!)).toEqual(5)
      })

      it('should parse Buddhist year only (yyyy)', () => {
        const parsed = adapter.parse('2566', 'yyyy')
        expect(parsed).toBeInstanceOf(Date)
        expect(adapter.getYear(parsed!)).toEqual(2023)
      })

      it('should parse month only (MM)', () => {
        const parsed = adapter.parse('06', 'MM')
        expect(parsed).toBeInstanceOf(Date)
      })

      it('should return null for empty string', () => {
        const parsed = adapter.parse('', 'dd/MM/yyyy')
        expect(parsed).toBeNull()
      })

      it('should return null for unsupported format', () => {
        const parsed = adapter.parse('2023-06-10', 'yyyy-MM-dd')
        expect(parsed).toBeNull()
      })
    })

    describe('Date validation', () => {
      it('should validate correct date', () => {
        const validDate = new Date('2023-06-10')
        expect(adapter.isValid(validDate)).toEqual(true)
      })

      it('should invalidate invalid date', () => {
        const invalidDate = new Date('invalid')
        expect(adapter.isValid(invalidDate)).toEqual(false)
      })

      it('should handle null dates', () => {
        expect(adapter.isNull(null as any)).toEqual(true)
        expect(adapter.isNull(date)).toEqual(false)
      })
    })

    describe('Date comparison', () => {
      const earlierDate = new Date('2023-06-01')
      const laterDate = new Date('2023-06-20')

      it('should compare dates correctly with isAfter', () => {
        expect(adapter.isAfter(laterDate, earlierDate)).toEqual(true)
        expect(adapter.isAfter(earlierDate, laterDate)).toEqual(false)
      })

      it('should compare dates correctly with isBefore', () => {
        expect(adapter.isBefore(earlierDate, laterDate)).toEqual(true)
        expect(adapter.isBefore(laterDate, earlierDate)).toEqual(false)
      })

      it('should check date equality', () => {
        const sameDate = new Date(2023, 5, 10, 6, 44, 0)
        expect(adapter.isEqual(date, sameDate)).toEqual(true)
        expect(adapter.isEqual(date, laterDate)).toEqual(false)
      })

      it('should check same day', () => {
        const sameDay = new Date('2023-06-10T12:00:00.000Z')
        expect(adapter.isSameDay(date, sameDay)).toEqual(true)
      })

      it('should check same month', () => {
        const sameMonth = new Date('2023-06-20')
        expect(adapter.isSameMonth(date, sameMonth)).toEqual(true)
      })

      it('should check same year', () => {
        const sameYear = new Date('2023-12-31')
        expect(adapter.isSameYear(date, sameYear)).toEqual(true)
      })
    })

    describe('Date arithmetic', () => {
      it('should add seconds correctly', () => {
        const result = adapter.addSeconds(date, 30)
        expect(adapter.getSeconds(result)).toEqual(30)
      })

      it('should add minutes correctly', () => {
        const result = adapter.addMinutes(date, 15)
        expect(adapter.getMinutes(result)).toEqual(59)
      })

      it('should add hours correctly', () => {
        const result = adapter.addHours(date, 2)
        expect(adapter.getHours(result)).toEqual(8)
      })

      it('should add days correctly', () => {
        const result = adapter.addDays(date, 5)
        expect(adapter.getDate(result)).toEqual(15)
      })

      it('should add weeks correctly', () => {
        const result = adapter.addWeeks(date, 1)
        expect(adapter.getDiff(result, date, 'days')).toEqual(7)
      })

      it('should add months correctly', () => {
        const result = adapter.addMonths(date, 1)
        expect(adapter.getMonth(result)).toEqual(6) // July
      })

      it('should add years correctly', () => {
        const result = adapter.addYears(date, 1)
        expect(adapter.getYear(result)).toEqual(2024)
      })
    })

    describe('Date manipulation', () => {
      it('should get start of day', () => {
        const result = adapter.startOfDay(date)
        expect(adapter.getHours(result)).toEqual(0)
        expect(adapter.getMinutes(result)).toEqual(0)
        expect(adapter.getSeconds(result)).toEqual(0)
      })

      it('should get end of day', () => {
        const result = adapter.endOfDay(date)
        expect(adapter.getHours(result)).toEqual(23)
        expect(adapter.getMinutes(result)).toEqual(59)
        expect(adapter.getSeconds(result)).toEqual(59)
      })

      it('should get start of month', () => {
        const result = adapter.startOfMonth(date)
        expect(adapter.getDate(result)).toEqual(1)
      })

      it('should get end of month', () => {
        const result = adapter.endOfMonth(date)
        expect(adapter.getDate(result)).toEqual(30)
      })

      it('should get days in month', () => {
        expect(adapter.getDaysInMonth(date)).toEqual(30)
      })

      it('should merge date and time', () => {
        const dateOnly = new Date('2023-06-10T00:00:00.000Z')
        const timeOnly = new Date('2000-01-01T14:30:45.000Z')
        const merged = adapter.mergeDateAndTime(dateOnly, timeOnly)

        expect(adapter.getDate(merged)).toEqual(10)
        expect(adapter.getMonth(merged)).toEqual(5)
        expect(adapter.getYear(merged)).toEqual(2023)
        expect(adapter.getHours(merged)).toEqual(14)
        expect(adapter.getMinutes(merged)).toEqual(30)
        expect(adapter.getSeconds(merged)).toEqual(45)
      })
    })

    describe('ISO string handling', () => {
      it('should parse ISO string', () => {
        const isoString = '2023-06-10T06:44:00.000Z'
        const parsed = adapter.parseISO(isoString)
        expect(parsed).toBeInstanceOf(Date)
      })

      it('should convert to ISO string', () => {
        const iso = adapter.toISO(date)
        expect(iso).toMatch(/2023-06-10T/)
      })
    })
  })

  describe('Thai locale (th)', () => {
    // Type assertion needed due to AdapterOptions generic constraint
    const adapter = new AdapterDateFns({ locale: th } as any)
    let date: Date

    beforeEach(() => {
      // Use local time to avoid timezone conversion issues
      date = new Date(2023, 5, 10, 6, 44, 0) // June 10, 2023 06:44:00
    })

    describe('Locale configuration', () => {
      it('should return Thai locale code', () => {
        expect(adapter.getCurrentLocaleCode()).toEqual('th')
      })

      it('should not use 12-hour cycle in Thai locale', () => {
        expect(adapter.is12HourCycleInCurrentLocale()).toEqual(false)
      })
    })

    describe('Thai weekday handling', () => {
      it('should return Thai weekday abbreviations', () => {
        const result = adapter.getWeekdays()
        expect(result).toStrictEqual(['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'])
      })

      it('should get week array starting on Sunday (Thai locale)', () => {
        const result = adapter.getWeekArray(date)
        expect(adapter.formatByString(result[0][0], 'EEEEEE')).toEqual('อา.')
      })
    })

    describe('Thai date formatting with Buddhist year', () => {
      it('should format fullDate in Thai', () => {
        expect(adapter.format(date, 'fullDate')).toEqual('10 มิ.ย. 2566')
      })

      it('should format fullDateWithWeekday in Thai', () => {
        expect(adapter.format(date, 'fullDateWithWeekday')).toEqual('วันเสาร์ที่ 10 มิถุนายน 2566')
      })

      it('should format fullDateTime in Thai', () => {
        expect(adapter.format(date, 'fullDateTime')).toEqual('10 มิ.ย. 2566 6:44 น.')
      })

      it('should format fullDateTime12h in Thai', () => {
        expect(adapter.format(date, 'fullDateTime12h')).toEqual('10 มิ.ย. 2566 06:44 ก่อนเที่ยง')
      })

      it('should format fullDateTime24h in Thai', () => {
        expect(adapter.format(date, 'fullDateTime24h')).toEqual('10 มิ.ย. 2566 06:44')
      })

      it('should format keyboardDate in Thai format', () => {
        expect(adapter.format(date, 'keyboardDate')).toEqual('10/06/2566')
      })

      it('should format keyboardDateTime in Thai', () => {
        expect(adapter.format(date, 'keyboardDateTime')).toEqual('10/06/2566 6:44 น.')
      })

      it('should format keyboardDateTime12h in Thai', () => {
        expect(adapter.format(date, 'keyboardDateTime12h')).toEqual('10/06/2566 06:44 ก่อนเที่ยง')
      })

      it('should format keyboardDateTime24h in Thai', () => {
        expect(adapter.format(date, 'keyboardDateTime24h')).toEqual('10/06/2566 06:44')
      })
    })

    describe('Thai date parsing', () => {
      it('should parse Thai keyboard date format (dd/MM/yyyy)', () => {
        const parsed = adapter.parse('10/06/2566', 'P')
        expect(parsed).toBeInstanceOf(Date)
        expect(adapter.getYear(parsed!)).toEqual(2023)
      })
    })
  })

  describe('Leap year handling', () => {
    const adapter = new AdapterDateFns()

    it('should handle leap year February 29th', () => {
      const leapDate = new Date(2024, 1, 29) // Feb 29, 2024 (leap year)
      expect(adapter.isValid(leapDate)).toEqual(true)
      expect(adapter.getMonth(leapDate)).toEqual(1) // February
      expect(adapter.getDate(leapDate)).toEqual(29)
      expect(adapter.getYear(leapDate)).toEqual(2024)
    })

    it('should format leap year date with Buddhist year', () => {
      const leapDate = new Date(2024, 1, 29, 12, 0, 0)
      expect(adapter.format(leapDate, 'fullDate')).toMatch(/2567/)
      expect(adapter.format(leapDate, 'keyboardDate')).toMatch(/29/)
    })

    it('should get correct days in February for leap year', () => {
      const leapFeb = new Date(2024, 1, 15)
      expect(adapter.getDaysInMonth(leapFeb)).toEqual(29)
    })

    it('should get correct days in February for non-leap year', () => {
      const nonLeapFeb = new Date(2023, 1, 15)
      expect(adapter.getDaysInMonth(nonLeapFeb)).toEqual(28)
    })

    it('should parse Buddhist year leap date correctly', () => {
      const parsed = adapter.parse('29/02/2567', 'dd/MM/yyyy')
      expect(parsed).toBeInstanceOf(Date)
      if (parsed) {
        expect(adapter.getYear(parsed)).toEqual(2024)
        expect(adapter.getMonth(parsed)).toEqual(1)
        expect(adapter.getDate(parsed)).toEqual(29)
      }
    })

    it('should handle end of month for leap year February', () => {
      const leapFeb = new Date(2024, 1, 15)
      const endOfMonth = adapter.endOfMonth(leapFeb)
      expect(adapter.getDate(endOfMonth)).toEqual(29)
    })

    it('should handle date arithmetic across leap day', () => {
      const beforeLeap = new Date(2024, 1, 28) // Feb 28, 2024
      const afterLeap = adapter.addDays(beforeLeap, 1)
      expect(adapter.getDate(afterLeap)).toEqual(29)
      expect(adapter.getMonth(afterLeap)).toEqual(1)
    })

    it('should format Thai locale leap year date correctly', () => {
      const adapterTh = new AdapterDateFns({ locale: th } as any)
      const leapDate = new Date(2024, 1, 29, 12, 0, 0)
      const formatted = adapterTh.format(leapDate, 'fullDate')
      expect(formatted).toMatch(/2567/)
      expect(formatted).toMatch(/29/)
    })
  })

  describe('Edge cases and error handling', () => {
    const adapter = new AdapterDateFns()

    it('should handle undefined input in date()', () => {
      const result = adapter.date(undefined)
      expect(result).toBeInstanceOf(Date)
    })

    it('should handle null input in date()', () => {
      const result = adapter.date(null)
      expect(result).toBeNull()
    })

    it('should return invalid date', () => {
      const invalid = adapter.getInvalidDate()
      expect(adapter.isValid(invalid)).toEqual(false)
    })

    it('should handle null equality check', () => {
      expect(adapter.isEqual(null, null)).toEqual(true)
    })

    it('should format number as string', () => {
      expect(adapter.formatNumber('123')).toEqual('123')
    })

    it('should get meridiem text', () => {
      expect(adapter.getMeridiemText('am')).toEqual('AM')
      expect(adapter.getMeridiemText('pm')).toEqual('PM')
    })

    it('should get month array', () => {
      const date = new Date('2023-06-10')
      const months = adapter.getMonthArray(date)
      expect(months).toHaveLength(12)
      expect(adapter.getMonth(months[0])).toEqual(0) // January
      expect(adapter.getMonth(months[11])).toEqual(11) // December
    })

    it('should get year range', () => {
      const start = new Date('2020-01-01')
      const end = new Date('2023-12-31')
      const years = adapter.getYearRange([start, end])
      expect(years.length).toBeGreaterThanOrEqual(3)
    })

    it('should check if date is within range', () => {
      const date = new Date('2023-06-10')
      const start = new Date('2023-06-01')
      const end = new Date('2023-06-30')
      expect(adapter.isWithinRange(date, [start, end])).toEqual(true)
    })

    it('should handle timezone operations', () => {
      const date = new Date('2023-06-10')
      expect(adapter.getTimezone()).toEqual('default')
      expect(adapter.setTimezone(date)).toEqual(date)
      expect(adapter.dateWithTimezone('2023-06-10')).toBeInstanceOf(Date)
    })
  })
})
