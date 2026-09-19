import {
  addMonths,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isWithinInterval,
  lastDayOfMonth,
  max,
  min,
} from 'date-fns'
import { useState } from 'react'

import { AVAILABLE_MAX_DATE, AVAILABLE_MIN_DATE, MARKERS } from './constants'
import { getDefaultRanges } from './defaults'
import type { DateRange, Marker, ModalCustomProps, PickerProps } from './types'
import { NavigationAction } from './types'
import { getValidatedMonths, parseOptionalDate } from './utils'

type UseDateRangePickerProps = PickerProps & Pick<ModalCustomProps, 'onSubmit'>

export const useDateRangePicker = (props: UseDateRangePickerProps) => {
  const today = new Date()

  const {
    onChange: onChangeCallback,
    onSubmit: onSubmitCallback,
    value,
    defaultValue,
    initialDateRange,
    minDate,
    maxDate,
    definedRanges = getDefaultRanges(new Date(), props.locale),
    locale,
  } = props

  const minValidDate = parseOptionalDate(minDate, AVAILABLE_MIN_DATE)
  const maxValidDate = parseOptionalDate(maxDate, AVAILABLE_MAX_DATE)

  const initialRange = defaultValue ?? initialDateRange

  // Seed the visible months from the initial uncontrolled range, falling back
  // to the controlled value so a controlled picker opens on its range's month
  const [initialFirstMonth, initialSecondMonth] = getValidatedMonths(
    initialRange ?? value ?? {},
    minValidDate,
    maxValidDate,
  )

  // The picker is controlled when the parent provides `value`; otherwise the
  // range lives in internal state seeded by `defaultValue` (`initialDateRange`
  // is kept as a deprecated alias of `defaultValue`).
  const isControlled = value !== undefined
  const [internalRange, setInternalRange] = useState<DateRange>({
    ...initialRange,
  })
  const dateRange = isControlled ? value : internalRange

  const commitRange = (newRange: DateRange) => {
    if (!isControlled) {
      setInternalRange(newRange)
    }
    onChangeCallback?.(newRange)
  }
  const [hoverDay, setHoverDay] = useState<Date>()
  const [firstMonth, setFirstMonth] = useState<Date>(initialFirstMonth || today)
  const [secondMonth, setSecondMonth] = useState<Date>(
    initialSecondMonth || addMonths(firstMonth, 1),
  )

  const { startDate, endDate } = dateRange

  // handlers
  const handleSetFirstMonth = (date: Date) => {
    if (isBefore(date, secondMonth)) {
      if (isAfter(date, minValidDate)) {
        setFirstMonth(date)
        return
      }
      setFirstMonth(lastDayOfMonth(minValidDate))
      return
    }
    if (isBefore(addMonths(date, 1), maxValidDate)) {
      setFirstMonth(date)
      setSecondMonth(addMonths(date, 1))
      return
    }
    setSecondMonth(maxValidDate)
    setFirstMonth(addMonths(maxValidDate, -1))
  }

  const handleSetSecondMonth = (date: Date) => {
    if (isAfter(date, firstMonth)) {
      if (isBefore(date, maxValidDate)) {
        setSecondMonth(date)
        return
      }
      setSecondMonth(lastDayOfMonth(maxValidDate))
      return
    }
    if (isAfter(addMonths(date, -1), minValidDate)) {
      setSecondMonth(date)
      setFirstMonth(addMonths(date, -1))
      return
    }
    setFirstMonth(minValidDate)
    setSecondMonth(addMonths(minValidDate, 1))
  }

  const handleSetSingleMonth = (date: Date) => {
    if (isAfter(date, minValidDate) && isBefore(date, maxValidDate)) {
      setFirstMonth(date)
      return
    }
    if (isBefore(date, minValidDate) || isSameDay(date, minValidDate)) {
      setFirstMonth(minValidDate)
      return
    }
    if (isAfter(date, maxValidDate) || isSameDay(date, maxValidDate)) {
      setFirstMonth(maxValidDate)
    }
  }

  const handleClickDefinedRange = (range: DateRange) => {
    let { startDate: newStart, endDate: newEnd } = range

    if (newStart && newEnd) {
      newStart = max([newStart, minValidDate])
      newEnd = min([newEnd, maxValidDate])

      const newRange = { startDate: newStart, endDate: newEnd }
      commitRange(newRange)

      setFirstMonth(newStart)
      setSecondMonth(
        isSameMonth(newStart, newEnd) ? addMonths(newStart, 1) : newEnd,
      )
    } else {
      commitRange({})

      setFirstMonth(today)
      setSecondMonth(addMonths(firstMonth, 1))
    }
  }

  const handleClickDateNumber = (day: Date) => {
    if (startDate && !endDate && !isBefore(day, startDate)) {
      commitRange({ startDate, endDate: day })
    } else {
      commitRange({ startDate: day, endDate: undefined })
    }
    setHoverDay(day)
  }

  const handleClickSubmit = () => {
    const { startDate: start, endDate: end } = dateRange
    if (onSubmitCallback && start && end) {
      onSubmitCallback(dateRange)
    }
  }

  const handleClickNavIcon = (marker: Marker, action: NavigationAction) => {
    if (marker === MARKERS.SINGLE_MONTH) {
      setFirstMonth(addMonths(firstMonth, action))
      setSecondMonth(addMonths(secondMonth, action))
      return
    }
    if (marker === MARKERS.FIRST_MONTH) {
      const firstNew = addMonths(firstMonth, action)
      if (isBefore(firstNew, secondMonth)) setFirstMonth(firstNew)
    } else {
      const secondNew = addMonths(secondMonth, action)
      if (isBefore(firstMonth, secondNew)) setSecondMonth(secondNew)
    }
  }

  const handleHoverDateNumber = (date: Date) => {
    if (startDate && !endDate) {
      if (!hoverDay || !isSameDay(date, hoverDay)) {
        setHoverDay(date)
      }
    }
  }

  // helpers
  const isInHoverRange = (day: Date) =>
    (startDate &&
      !endDate &&
      hoverDay &&
      isAfter(hoverDay, startDate) &&
      isWithinInterval(day, { start: startDate, end: hoverDay })) as boolean

  const helpers = {
    isInHoverRange,
  }

  const handlers = {
    handleClickDateNumber,
    handleClickSubmit,
    handleClickNavIcon,
    handleHoverDateNumber,
  }

  return {
    dateRange,
    ranges: definedRanges,
    minDate: minValidDate,
    maxDate: maxValidDate,
    firstMonth,
    secondMonth,
    handleSetFirstMonth,
    handleSetSecondMonth,
    handleSetSingleMonth,
    handleClickDefinedRange,
    helpers,
    handlers,
    locale,
  }
}
