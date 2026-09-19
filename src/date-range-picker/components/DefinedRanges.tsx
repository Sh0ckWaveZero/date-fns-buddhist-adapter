import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  alpha,
  useTheme,
} from '@mui/material'
import type { ReactElement } from 'react'

import type { DateRange, DefinedRange } from '../types'
import { isSameDay } from 'date-fns'

type DefinedRangesProps = {
  setRange: (range: DateRange) => void
  selectedRange: DateRange
  ranges: DefinedRange[]
}

const isSameRange = (first: DateRange, second: DateRange) => {
  const { startDate: fStart, endDate: fEnd } = first
  const { startDate: sStart, endDate: sEnd } = second
  if (fStart && sStart && fEnd && sEnd) {
    return isSameDay(fStart, sStart) && isSameDay(fEnd, sEnd)
  }
  return false
}

export const DefinedRanges = ({
  ranges,
  setRange,
  selectedRange,
}: DefinedRangesProps): ReactElement => {
  const theme = useTheme()

  return (
    <>
      <Box sx={{ height: '54px', width: '100%', flexShrink: 0 }}>
        <Box
          sx={{
            height: '54px',
            backgroundColor: alpha(theme.palette.grey[400], 0.1),
          }}
        />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <List
          sx={{
            pt: '10px',
          }}
        >
          {ranges.map((range, idx) => (
            <ListItem
              disablePadding
              key={idx}
              onClick={() => setRange(range)}
              sx={[
                isSameRange(range, selectedRange)
                  ? {
                      backgroundColor: alpha(theme.palette.grey[600], 0.1),
                    }
                  : {},
              ]}
            >
              <ListItemButton
                disableRipple
                dense
                sx={{
                  p: {
                    xs: '8px',
                    md: '12px',
                  },
                  height: '32px',
                }}
              >
                <ListItemText
                  primary={range.label}
                  sx={{
                    my: 0,
                    fontSize: 13,
                    fontWeight: 400,
                    color: isSameRange(range, selectedRange)
                      ? alpha(theme.palette.grey[800], 1)
                      : alpha(theme.palette.grey[600], 1),
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  )
}
