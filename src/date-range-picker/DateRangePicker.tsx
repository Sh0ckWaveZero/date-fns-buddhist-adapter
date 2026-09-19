import { useDateRangePicker } from './useDateRangePicker'
import { Sections } from './components/Sections'
import type { ModalCustomProps, PickerProps } from './types'

type PickerAvailableProps = PickerProps & {
  customProps?: ModalCustomProps
  footerRequired?: boolean
}

export const DateRangePicker = (props: PickerAvailableProps) => {
  const { customProps, ...dateRangePickerProps } = props
  const onSubmit = customProps?.onSubmit

  const { ...computedProps } = useDateRangePicker({
    ...dateRangePickerProps,
    onSubmit,
  })
  return (
    <Sections {...dateRangePickerProps} {...computedProps} {...customProps} />
  )
}
