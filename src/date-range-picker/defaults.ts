import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from 'date-fns'
import type { Locale } from 'date-fns'

import type { DefinedRange } from './types'

const ENGLISH_RANGE_LABELS = [
  'Today',
  'Yesterday',
  'This Week',
  'Last Week',
  'Last 7 Days',
  'This Month',
  'Last Month',
  'This Year',
  'Last Year',
]

/** Preset labels keyed by date-fns locale code; falls back to English */
const RANGE_LABELS_BY_LOCALE: Record<string, string[]> = {
  th: [
    'วันนี้',
    'เมื่อวาน',
    'สัปดาห์นี้',
    'สัปดาห์ที่แล้ว',
    '7 วันล่าสุด',
    'เดือนนี้',
    'เดือนที่แล้ว',
    'ปีนี้',
    'ปีที่แล้ว',
  ],
}

/**
 * Default ranges used to populate the presets list. Labels follow the given
 * locale (see `RANGE_LABELS_BY_LOCALE`); pass `definedRanges` to override.
 */
export const getDefaultRanges = (
  date: Date,
  locale?: Locale,
): DefinedRange[] => {
  const labels =
    (locale?.code && RANGE_LABELS_BY_LOCALE[locale.code]) ||
    ENGLISH_RANGE_LABELS

  return [
    {
      label: labels[0],
      startDate: date,
      endDate: date,
    },
    {
      label: labels[1],
      startDate: addDays(date, -1),
      endDate: addDays(date, -1),
    },
    {
      label: labels[2],
      startDate: startOfWeek(date, { locale }),
      endDate: endOfWeek(date, { locale }),
    },
    {
      label: labels[3],
      startDate: startOfWeek(addWeeks(date, -1), { locale }),
      endDate: endOfWeek(addWeeks(date, -1), { locale }),
    },
    {
      label: labels[4],
      startDate: addWeeks(date, -1),
      endDate: date,
    },
    {
      label: labels[5],
      startDate: startOfMonth(date),
      endDate: endOfMonth(date),
    },
    {
      label: labels[6],
      startDate: startOfMonth(addMonths(date, -1)),
      endDate: endOfMonth(addMonths(date, -1)),
    },
    {
      label: labels[7],
      startDate: startOfYear(date),
      endDate: endOfYear(date),
    },
    {
      label: labels[8],
      startDate: startOfYear(addYears(date, -1)),
      endDate: endOfYear(addYears(date, -1)),
    },
  ]
}
