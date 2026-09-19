import { Box, InputAdornment, TextField } from '@mui/material'
import type { PopoverProps } from '@mui/material/Popover'
import { useRef, useState } from 'react'

import { CalendarIcon } from './icons'
import { PickerModal } from './PickerModal'
import type { DateRange, ModalCustomProps, PickerProps } from './types'
import { formatWithEra } from './utils'

export type PickerInputProps = PickerProps & {
  /**
   * date-fns display format for both ends of the range.
   * @default 'dd/MM/yyyy'
   */
  format?: string
  /**
   * Separator rendered between the two dates.
   * @default '–'
   */
  separator?: string
  /**
   * Placeholder of each empty end of the range; defaults to the uppercased `format`.
   */
  placeholder?: string
  label?: string
  size?: 'small' | 'medium'
  fullWidth?: boolean
  disabled?: boolean
  /**
   * Props merged into the internal `PickerModal` popover props. `open`,
   * `anchorEl` and `onClose` are managed by the input.
   */
  modalProps?: Partial<PopoverProps>
  /**
   * Props merged into the internal `PickerModal` custom props. `onSubmit` and
   * `onCloseCallback` close the popover by default.
   */
  customProps?: Partial<ModalCustomProps>
}

export const PickerInput = ({
  format = 'dd/MM/yyyy',
  separator = '–',
  placeholder,
  label,
  size = 'small',
  fullWidth = false,
  disabled = false,
  modalProps,
  customProps,
  ...pickerProps
}: PickerInputProps) => {
  const anchorRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  // Mirror the same controlled/uncontrolled contract as the picker itself so
  // the input can render the range while the modal owns the selection state
  const isControlled = pickerProps.value !== undefined
  const [internalRange, setInternalRange] = useState<DateRange>(
    pickerProps.defaultValue ?? pickerProps.initialDateRange ?? {},
  )
  const dateRange: DateRange = isControlled
    ? (pickerProps.value ?? {})
    : internalRange

  const handleChange = (range: DateRange) => {
    if (!isControlled) {
      setInternalRange(range)
    }
    pickerProps.onChange?.(range)
  }

  const { startDate, endDate } = dateRange
  const sectionPlaceholder = placeholder ?? format.toUpperCase()
  const renderDate = (date?: Date) =>
    date
      ? formatWithEra(date, format, {
          locale: pickerProps.locale,
          buddhistEra: pickerProps.buddhistEra,
        })
      : sectionPlaceholder
  const displayValue =
    startDate || endDate
      ? `${renderDate(startDate)} ${separator} ${renderDate(endDate)}`
      : ''
  const inputPlaceholder = `${sectionPlaceholder} ${separator} ${sectionPlaceholder}`

  const handleOpen = () => {
    if (!disabled) {
      setOpen(true)
    }
  }
  const handleClose: PopoverProps['onClose'] = (event, reason) => {
    setOpen(false)
    modalProps?.onClose?.(event, reason)
  }
  const handleSubmit: NonNullable<ModalCustomProps['onSubmit']> = (range) => {
    customProps?.onSubmit?.(range)
    setOpen(false)
  }
  const handleCloseCallback = () => {
    customProps?.onCloseCallback?.()
    setOpen(false)
  }

  return (
    <>
      <Box
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          display: fullWidth ? 'flex' : 'inline-flex',
          width: fullWidth ? '100%' : 'auto',
          cursor: disabled ? 'default' : 'pointer',
        }}
      >
        <TextField
          fullWidth={fullWidth}
          size={size}
          label={label}
          disabled={disabled}
          value={displayValue}
          placeholder={inputPlaceholder}
          // Clicks must land on the wrapping Box so the input never takes
          // focus (which would close the popover on blur)
          sx={{
            pointerEvents: 'none',
            width: fullWidth ? '100%' : '315px',
            '& .MuiInputBase-root': { cursor: 'pointer' },
            '& .MuiInputBase-input': { cursor: 'pointer' },
          }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <CalendarIcon
                    fontSize="small"
                    sx={{ color: 'action.active' }}
                  />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      <PickerModal
        {...pickerProps}
        onChange={handleChange}
        modalProps={{
          ...modalProps,
          open: open && Boolean(anchorRef.current),
          anchorEl: anchorRef.current,
          onClose: handleClose,
        }}
        customProps={{
          ...customProps,
          onSubmit: handleSubmit,
          onCloseCallback: handleCloseCallback,
        }}
      />
    </>
  )
}
