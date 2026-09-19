import type { PopoverProps } from '@mui/material/Popover'
import type { SvgIconProps } from '@mui/material/SvgIcon'
import type { Locale } from 'date-fns'
import type { Dispatch, ElementType, SetStateAction } from 'react'

/** Marker identifying which calendar a navigation action targets */
export type Marker = symbol

/**
 * A range of dates. Both ends are optional so a selection can be in progress
 * (start picked, end pending). All `Date` values are in Christian years —
 * Buddhist Era rendering is display-only.
 */
export type DateRange = {
  /** First day of the range (inclusive) */
  startDate?: Date
  /** Last day of the range (inclusive) */
  endDate?: Date
}

/** A quick-select preset shown in the predefined ranges list */
export type DefinedRange = {
  /** First day of the preset (inclusive) */
  startDate: Date
  /** Last day of the preset (inclusive) */
  endDate: Date
  /** Label rendered in the presets list / dropdown */
  label: string
}

export type Setter<T> = Dispatch<SetStateAction<T>> | ((value: T) => void)

/** Direction of a calendar navigation */
export enum NavigationAction {
  Previous = -1,
  Next = 1,
}

/** Responsive pair of separator icons (small screens / medium and up) */
export type RangeSeparatorIconsProps = {
  /** Icon shown between the footer dates below the `md` breakpoint */
  xs?: ElementType<SvgIconProps>
  /** Icon shown between the footer dates from the `md` breakpoint up */
  md?: ElementType<SvgIconProps>
}

/** Customizable texts of the picker */
export type Labels = {
  /** Title of the quick-select presets list. @default 'Quick Select' */
  predefinedRanges?: string
  /** Texts of the footer action buttons */
  actions?: {
    /** @default 'Cancel' */
    cancel?: string
    /** @default 'Apply' */
    apply?: string
  }
  /** Texts of the empty footer date previews */
  footer?: {
    /** @default 'Start Date' */
    startDate?: string
    /** @default 'End Date' */
    endDate?: string
  }
}

/** Props shared by {@link PickerBaseProps}, {@link PickerModalProps} and {@link PickerInputProps} */
export type PickerProps = {
  /**
   * Controlled selected range, managed by the parent. When provided, the
   * picker ignores its internal state and every selection is reported
   * through `onChange`.
   */
  value?: DateRange
  /**
   * Initial range of the uncontrolled picker (managed by internal state).
   * Ignored when `value` is provided.
   */
  defaultValue?: DateRange
  /**
   * @deprecated Use `defaultValue` instead.
   */
  initialDateRange?: DateRange
  /**
   * Custom quick-select presets replacing the built-in ones.
   * @default getDefaultRanges(new Date(), locale)
   */
  definedRanges?: DefinedRange[]
  /**
   * Earliest selectable date (a `Date` or an ISO string such as `'2026-01-01'`).
   * @default start of the year, 10 years back
   */
  minDate?: Date | string
  /**
   * Latest selectable date (a `Date` or an ISO string such as `'2026-12-31'`).
   * @default end of the year, 10 years ahead
   */
  maxDate?: Date | string
  /**
   * date-fns locale driving week start, weekday/month names and preset math.
   * @default date-fns default locale (en-US)
   */
  locale?: Locale
  /** Custom texts of the picker */
  labels?: Labels
  /**
   * Display years in Buddhist Era (Christian year + 543) in calendar headers,
   * the footer preview and `PickerInput`. Internal `Date` values always stay
   * in Christian years.
   * @default true
   */
  buddhistEra?: boolean
  /** Called with the new range on every selection, in both value modes */
  onChange?: (dateRange: DateRange) => void
  /**
   * Hide the quick-select presets list entirely.
   * @default false
   */
  hideDefaultRanges?: boolean
  /**
   * Render days of neighboring months as invisible placeholders.
   * @default true
   */
  hideOutsideMonthDays?: boolean
}

/** Props of the modal layer shared by `PickerModal` consumers */
export type ModalCustomProps = {
  /** Called when the user presses Apply with a complete range */
  onSubmit?: (dateRange: DateRange) => void
  /** Called when the user presses Cancel */
  onCloseCallback?: () => void
  /** Responsive icons rendered between the footer date previews */
  RangeSeparatorIcons?: RangeSeparatorIconsProps
  /**
   * Hide the footer Cancel/Apply buttons.
   * @default false
   */
  hideActionButtons?: boolean
}

/** Props of {@link ./PickerBase.tsx | PickerBase} — the inline picker */
export type PickerBaseProps = PickerProps

/** Props of `PickerModal` — popover on desktop, full-screen dialog on mobile */
export type PickerModalProps = PickerProps & {
  /**
   * Props forwarded to the MUI `Popover` (desktop) — `open`, `anchorEl` and
   * `onClose` are required by the consumer. On mobile viewports only `open`
   * and `onClose` are used, rendered inside a full-screen `Dialog`.
   */
  modalProps: PopoverProps
  /** Modal behavior: submit/close callbacks, separator icons, action buttons */
  customProps: ModalCustomProps
}
