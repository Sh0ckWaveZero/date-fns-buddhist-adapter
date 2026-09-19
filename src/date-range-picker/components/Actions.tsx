import { Box, Button, styled } from '@mui/material'

import type { Labels, ModalCustomProps } from '../types'

const CancelButtonStyled = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontSize: 13,
  fontWeight: 400,
  borderRadius: '8px',
  marginRight: '8px',
  padding: '0 16px',
  height: '36px',
  color: theme.palette.grey[600],
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
  },
}))

const ApplyButtonStyled = styled(Button)({
  fontSize: 13,
  fontWeight: 400,
  borderRadius: '8px',
  textTransform: 'none',
  height: '36px',
  padding: '0 16px',
})

type ActionsProps = Omit<ModalCustomProps, 'onSubmit'> & {
  labels?: Labels['actions']
  onSubmit: () => void
}

export const Actions = ({
  onCloseCallback,
  onSubmit,
  labels,
}: ActionsProps) => {
  return (
    <>
      <Box>
        <CancelButtonStyled
          disableRipple
          disableElevation
          variant="text"
          onClick={onCloseCallback}
        >
          {labels?.cancel || 'Cancel'}
        </CancelButtonStyled>
      </Box>

      <Box>
        <ApplyButtonStyled
          disableRipple
          disableElevation
          type="submit"
          variant="contained"
          color="primary"
          onClick={onSubmit}
        >
          {labels?.apply || 'Apply'}
        </ApplyButtonStyled>
      </Box>
    </>
  )
}
