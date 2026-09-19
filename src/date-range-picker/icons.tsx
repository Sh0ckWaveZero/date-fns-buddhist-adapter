import { SvgIcon } from '@mui/material'
import type { SvgIconProps } from '@mui/material/SvgIcon'

/**
 * Inline Material-style icons so the picker does not depend on @mui/icons-material.
 * Paths are from the Material Icons set (Apache 2.0).
 */
const createIcon = (d: string) => {
  const Icon = (props: SvgIconProps) => (
    <SvgIcon {...props}>
      <path d={d} />
    </SvgIcon>
  )
  return Icon
}

export const ChevronLeftIcon = createIcon(
  'M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z',
)

export const ChevronRightIcon = createIcon(
  'M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z',
)

export const ChevronDownIcon = createIcon(
  'M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z',
)

export const DoubleArrowRightIcon = createIcon(
  'M17.59 18 19 16.59 14.42 12 19 7.41 17.59 6 11.59 12zM11 18l1.41-1.41L7.83 12l4.58-4.59L11 6 5 12z',
)

export const DoubleArrowDownIcon = createIcon(
  'M18 6.41 16.59 5 12 9.58 7.41 5 6 6.41l6 6zM6 17.59 7.41 19 12 14.42 16.59 19 18 17.59l-6-6z',
)

export const CalendarIcon = createIcon(
  'M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-1.99.9-1.99 2L2 19c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H4V8h16v11zM4 6V5h16v1H4z',
)
