import { addYears, endOfYear, startOfYear } from 'date-fns'

import type { Marker } from './types'

/** Offset added to a Christian year to get the Buddhist Era year */
export const BUDDHIST_ERA_OFFSET = 543

export const AVAILABLE_MIN_DATE = startOfYear(addYears(new Date(), -10))
export const AVAILABLE_MAX_DATE = endOfYear(addYears(new Date(), 10))

export const MARKERS: { [key: string]: Marker } = {
  FIRST_MONTH: Symbol('firstMonth'),
  SECOND_MONTH: Symbol('secondMonth'),
  SINGLE_MONTH: Symbol('singleMonth'),
}
