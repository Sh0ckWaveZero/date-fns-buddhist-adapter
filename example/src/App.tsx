import { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Container, Typography, Box, Paper, Stack } from '@mui/material'
import { th } from 'date-fns/locale'
import AdapterDateFns from '../../src/index'

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={th}
    >
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Stack spacing={4}>
            <Box>
              <Typography variant="h3" component="h1" gutterBottom>
                🇹🇭 Buddhist Date Adapter
              </Typography>
              <Typography variant="body1" color="text.secondary">
                date-fns adapter with Buddhist Era (BE) support for MUI X Date Pickers
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom>
                Select a date (Buddhist Era)
              </Typography>
              <DatePicker
                label="วันที่ (พ.ศ.)"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    helperText: 'ปีจะแสดงในรูปแบบพุทธศักราช (BE)',
                  },
                }}
              />
            </Box>

            {selectedDate && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Selected Date Information
                </Typography>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Stack spacing={1}>
                    <Typography>
                      <strong>Buddhist Era (BE):</strong>{' '}
                      {selectedDate.getFullYear() + 543}
                    </Typography>
                    <Typography>
                      <strong>Christian Era (CE):</strong>{' '}
                      {selectedDate.getFullYear()}
                    </Typography>
                    <Typography>
                      <strong>Full Date (TH):</strong>{' '}
                      {selectedDate.toLocaleDateString('th-TH', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </Typography>
                    <Typography>
                      <strong>ISO Format:</strong>{' '}
                      {selectedDate.toISOString().split('T')[0]}
                    </Typography>
                  </Stack>
                </Paper>
              </Box>
            )}

            <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.100', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                📦 Installation
              </Typography>
              <Paper variant="outlined" sx={{ p: 2, bgcolor: 'background.paper' }}>
                <code style={{ fontFamily: 'monospace' }}>
                  npm install @midseelee/date-fns-buddhist-adapter
                </code>
              </Paper>

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                💻 Usage
              </Typography>
              <Paper variant="outlined" sx={{ p: 2, bgcolor: 'background.paper' }}>
                <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.875rem' }}>
{`import { LocalizationProvider } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { th } from 'date-fns/locale/th'
import AdapterDateFns from '@midseelee/date-fns-buddhist-adapter'

function App() {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={th}
    >
      <DatePicker label="วันที่ (พ.ศ.)" />
    </LocalizationProvider>
  )
}`}
                </pre>
              </Paper>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </LocalizationProvider>
  )
}

export default App
