import { Box, Divider, Typography, useTheme } from '@mui/material'
import type { ReactElement } from 'react'
import type { Locale } from 'date-fns'

import { DoubleArrowDownIcon, DoubleArrowRightIcon } from '../icons'
import type { Labels, ModalCustomProps } from '../types'
import { formatWithEra } from '../utils'
import { Actions } from './Actions'

const previewDateSx = {
  position: 'relative',
  top: '1px',
  minWidth: '130px',
  fontSize: 14,
  lineHeight: '14px',
  textAlign: { xs: 'center', md: 'left' },
} as const

type FooterProps = {
  startDate?: Date
  endDate?: Date
  locale?: Locale
  labels?: Labels
  buddhistEra?: boolean
} & Omit<ModalCustomProps, 'onSubmit'> & {
    onSubmit: () => void
  }

export const Footer = ({
  startDate,
  endDate,
  locale,
  labels,
  buddhistEra,
  onCloseCallback,
  onSubmit,
  RangeSeparatorIcons,
}: FooterProps): ReactElement => {
  const theme = useTheme()
  const previewDate = (date: Date) => {
    return formatWithEra(date, 'dd MMMM yyyy', { locale, buddhistEra })
  }

  const IconXs = RangeSeparatorIcons?.xs || DoubleArrowDownIcon
  const IconMd = RangeSeparatorIcons?.md || DoubleArrowRightIcon

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          gap: '8px',
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        {startDate ? (
          <Typography sx={{ ...previewDateSx, color: 'grey.800' }}>
            {previewDate(startDate)}
          </Typography>
        ) : (
          <Typography sx={{ ...previewDateSx, color: 'grey.500' }}>
            {labels?.footer?.startDate || 'Start Date'}
          </Typography>
        )}

        <IconXs
          fontSize="small"
          sx={{
            color: theme.palette.grey[400],
            display: {
              xs: 'block',
              md: 'none',
            },
          }}
        />

        <IconMd
          fontSize="small"
          sx={{
            color: theme.palette.grey[400],
            display: {
              xs: 'none',
              md: 'block',
            },
          }}
        />

        {endDate ? (
          <Typography sx={{ ...previewDateSx, color: 'grey.800' }}>
            {previewDate(endDate)}
          </Typography>
        ) : (
          <Typography sx={{ ...previewDateSx, color: 'grey.500' }}>
            {labels?.footer?.endDate || 'End Date'}
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          display: {
            xs: 'block',
            md: 'none',
          },
        }}
      >
        <Divider orientation="horizontal" />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Actions
          onCloseCallback={onCloseCallback}
          onSubmit={onSubmit}
          labels={labels?.actions}
        />
      </Box>
    </>
  )
}
