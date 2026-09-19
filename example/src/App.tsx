import { useState } from 'react'
import type { ReactNode } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import { th } from 'date-fns/locale'
import AdapterDateFns from '@midseelee/date-fns-buddhist-adapter'
import {
  PickerBase,
  PickerInput,
  PickerModal,
} from '@midseelee/date-fns-buddhist-adapter/date-range-picker'
import type { DateRange, Labels } from '@midseelee/date-fns-buddhist-adapter/date-range-picker'

type Lang = 'th' | 'en'

const copy = {
  th: {
    title: '🇹🇭 Buddhist Date Adapter',
    subtitle:
      'date-fns adapter รองรับปีพุทธศักราชสำหรับ MUI X Date Pickers + Date Range Picker ในตัว',
    usage: '💻 วิธีใช้งาน',
    installation: '📦 การติดตั้ง',
    be: 'ปีพุทธศักราช (พ.ศ.)',
    ce: 'ปีคริสต์ศักราช (ค.ศ.)',
    fullDate: 'วันที่เต็ม (ไทย)',
    s1: {
      title: '1️⃣ วันเดียว — MUI X DatePicker + adapter',
      desc: 'ปีแสดงเป็นพุทธศักราชโดยใช้ LocalizationProvider + AdapterDateFns',
    },
    s2: {
      title: '2️⃣ ช่วงวันที่ — PickerInput (การใช้งานพื้นฐาน)',
      desc: 'ช่อง input อ่านอย่างเดียว กดแล้วเปิดปฏิทิน — controlled ด้วย value / onChange, แสดงผลเป็น พ.ศ.',
      label: 'ช่วงวันที่',
    },
    s3: {
      title: '3️⃣ ช่วงวันที่ — PickerModal (ปุ่มของคุณเอง)',
      desc: 'ผูกกับปุ่มเองได้ — Popover บน desktop, เต็มจอบนมือถือ; กด Apply เพื่อยืนยัน',
      pick: 'เลือกช่วงวันที่',
      pickAgain: 'ระบุช่วงวันที่ใหม่',
    },
    s4: {
      title: '4️⃣ ช่วงวันที่ — PickerBase (inline)',
      desc: 'ปฏิทินแบบฝังถาวร เลือกแล้วอัปเดตทันที (ไม่มีปุ่ม Apply) — เหมาะกับหน้า filter/dashboard',
    },
  },
  en: {
    title: '🇹🇭 Buddhist Date Adapter',
    subtitle:
      'date-fns adapter with Buddhist Era support for MUI X Date Pickers + a built-in Date Range Picker',
    usage: '💻 Usage',
    installation: '📦 Installation',
    be: 'Buddhist Era (BE)',
    ce: 'Christian Era (CE)',
    fullDate: 'Full Date',
    s1: {
      title: '1️⃣ Single date — MUI X DatePicker + adapter',
      desc: 'Renders Christian years via LocalizationProvider + AdapterDateFns',
    },
    s2: {
      title: '2️⃣ Date range — PickerInput (basic usage)',
      desc: 'A read-only input that opens the picker on click — controlled with value / onChange',
      label: 'Date range',
    },
    s3: {
      title: '3️⃣ Date range — PickerModal (custom trigger)',
      desc: 'Attach the popover to any trigger — Popover on desktop, full-screen dialog on mobile; Apply to confirm',
      pick: 'Pick a range',
      pickAgain: 'Pick another range',
    },
    s4: {
      title: '4️⃣ Date range — PickerBase (inline)',
      desc: 'An always-visible inline calendar that commits selections immediately (no Apply) — great for filter panels',
    },
  },
} as const

const thLabels: Labels = {
  predefinedRanges: 'ช่วงเวลายอดนิยม',
  actions: { apply: 'ตกลง', cancel: 'ยกเลิก' },
  footer: { startDate: 'วันเริ่มต้น', endDate: 'วันสิ้นสุด' },
}

function CodeBlock({ children }: { children: string }) {
  return (
    <Paper
      variant="outlined"
      sx={{ p: 2, bgcolor: 'background.paper', overflowX: 'auto' }}
    >
      <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.8rem' }}>
        {children}
      </pre>
    </Paper>
  )
}

function DemoSection({
  title,
  description,
  usageLabel,
  demo,
  usage,
}: {
  title: string
  description: string
  usageLabel: string
  demo: ReactNode
  usage: string
}) {
  return (
    <Box component="section">
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {description}
      </Typography>
      <Box sx={{ mt: 2, mb: 2 }}>{demo}</Box>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {usageLabel}
      </Typography>
      <CodeBlock>{usage}</CodeBlock>
    </Box>
  )
}

const PICKER_INPUT_USAGE = `import { PickerInput } from '@midseelee/date-fns-buddhist-adapter/date-range-picker'

<PickerInput
  value={range}
  onChange={setRange}
  locale={th}
  labels={thLabels}
  label="ช่วงวันที่"
  fullWidth
/>`

const PICKER_MODAL_USAGE = `import { PickerModal } from '@midseelee/date-fns-buddhist-adapter/date-range-picker'

const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

<Button onClick={(e) => setAnchorEl(e.currentTarget)}>
  {submitted ? 'ระบุช่วงวันที่ใหม่' : 'เลือกช่วงวันที่'}
</Button>
<PickerModal
  value={range}
  onChange={setRange}
  locale={th}
  labels={thLabels}
  modalProps={{
    open: Boolean(anchorEl),
    anchorEl,
    onClose: () => setAnchorEl(null),
  }}
  customProps={{
    onSubmit: () => setAnchorEl(null),
    onCloseCallback: () => setAnchorEl(null),
  }}
/>`

const PICKER_BASE_USAGE = `import { PickerBase } from '@midseelee/date-fns-buddhist-adapter/date-range-picker'

<PickerBase
  value={range}
  onChange={setRange}
  locale={th}
  labels={thLabels}
  hideOutsideMonthDays={false}
/>`

function SingleDateDemo({ lang }: { lang: Lang }) {
  const t = copy[lang]
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

  return (
    <DemoSection
      title={t.s1.title}
      description={t.s1.desc}
      usageLabel={t.usage}
      demo={
        <>
          <DatePicker
            label={lang === 'th' ? 'วันที่ (พ.ศ.)' : 'Date'}
            format="dd MMM yyyy"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            slotProps={{
              textField: { fullWidth: true, size: 'small' },
            }}
          />
          {selectedDate && (
            <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
              <Stack spacing={0.5}>
                <Typography>
                  <strong>{t.be}:</strong> {selectedDate.getFullYear() + 543}
                </Typography>
                <Typography>
                  <strong>{t.ce}:</strong> {selectedDate.getFullYear()}
                </Typography>
                <Typography>
                  <strong>{t.fullDate}:</strong>{' '}
                  {selectedDate.toLocaleDateString(
                    lang === 'th' ? 'th-TH' : 'en-US',
                    { year: 'numeric', month: 'long', day: 'numeric' },
                  )}
                </Typography>
              </Stack>
            </Paper>
          )}
        </>
      }
      usage={`import { LocalizationProvider } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import AdapterDateFns from '@midseelee/date-fns-buddhist-adapter'

<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={th}>
  <DatePicker label="วันที่ (พ.ศ.)" format="dd MMM yyyy" />
</LocalizationProvider>`}
    />
  )
}

function PickerInputDemo({ lang }: { lang: Lang }) {
  const t = copy[lang]
  const [range, setRange] = useState<DateRange>({})

  return (
    <DemoSection
      title={t.s2.title}
      description={t.s2.desc}
      usageLabel={t.usage}
      demo={
        <PickerInput
          value={range}
          onChange={setRange}
          locale={lang === 'th' ? th : undefined}
          buddhistEra={lang === 'th'}
          labels={lang === 'th' ? thLabels : undefined}
          label={t.s2.label}
          fullWidth
        />
      }
      usage={PICKER_INPUT_USAGE}
    />
  )
}

function PickerModalDemo({ lang }: { lang: Lang }) {
  const t = copy[lang]
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [range, setRange] = useState<DateRange>({})
  const [submitted, setSubmitted] = useState(false)

  return (
    <DemoSection
      title={t.s3.title}
      description={t.s3.desc}
      usageLabel={t.usage}
      demo={
        <>
          <Button
            variant="outlined"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            {submitted ? t.s3.pickAgain : t.s3.pick}
          </Button>
          {submitted && range.startDate && range.endDate && (
            <Typography component="span" sx={{ ml: 2 }}>
              ✅ {range.startDate.toLocaleDateString('th-TH')} –{' '}
              {range.endDate.toLocaleDateString('th-TH')}
            </Typography>
          )}
          <PickerModal
            value={range}
            onChange={(next) => {
              setRange(next)
              setSubmitted(false)
            }}
            locale={lang === 'th' ? th : undefined}
            labels={lang === 'th' ? thLabels : undefined}
            modalProps={{
              open: Boolean(anchorEl),
              anchorEl,
              onClose: () => setAnchorEl(null),
            }}
            customProps={{
              onSubmit: () => {
                setSubmitted(true)
                setAnchorEl(null)
              },
              onCloseCallback: () => setAnchorEl(null),
            }}
          />
        </>
      }
      usage={PICKER_MODAL_USAGE}
    />
  )
}

function PickerBaseDemo({ lang }: { lang: Lang }) {
  const t = copy[lang]
  const [range, setRange] = useState<DateRange>({})

  return (
    <DemoSection
      title={t.s4.title}
      description={t.s4.desc}
      usageLabel={t.usage}
      demo={
        <Box sx={{ overflowX: 'auto' }}>
          <Box sx={{ minWidth: 640 }}>
            <PickerBase
              value={range}
              onChange={setRange}
              locale={lang === 'th' ? th : undefined}
              labels={lang === 'th' ? thLabels : undefined}
              hideOutsideMonthDays={false}
            />
          </Box>
        </Box>
      }
      usage={PICKER_BASE_USAGE}
    />
  )
}

function App() {
  const [lang, setLang] = useState<Lang>('th')
  const t = copy[lang]

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={lang === 'th' ? th : undefined}
    >
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Stack spacing={5}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2,
                flexWrap: 'wrap',
              }}
            >
              <Box sx={{ flex: 1, minWidth: 280 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  {t.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {t.subtitle}
                </Typography>
              </Box>
              <Box sx={{ flexShrink: 0 }}>
                <ToggleButtonGroup
                  exclusive
                  size="small"
                  value={lang}
                  onChange={(_e, next: Lang | null) => {
                    if (next) setLang(next)
                  }}
                  sx={{
                    display: 'flex',
                    gap: 0.5,
                    '& .MuiToggleButton-root': {
                      textTransform: 'none',
                      fontSize: 13,
                      fontWeight: 500,
                      px: 2,
                      minHeight: 32,
                      borderRadius: '999px',
                      border: '1px solid',
                      borderColor: 'divider',
                      color: 'text.secondary',
                    },
                    '& .MuiToggleButton-root.Mui-selected': {
                      backgroundColor: 'primary.main',
                      borderColor: 'primary.main',
                      color: 'primary.contrastText',
                      '&:hover': { backgroundColor: 'primary.dark' },
                    },
                  }}
                >
                  <ToggleButton value="th">🇹🇭 ไทย</ToggleButton>
                  <ToggleButton value="en">🇬🇧 English</ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Box>

            <SingleDateDemo lang={lang} />
            <PickerInputDemo lang={lang} />
            <PickerModalDemo lang={lang} />
            <PickerBaseDemo lang={lang} />

            <Box sx={{ p: 3, bgcolor: 'grey.100', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                {t.installation}
              </Typography>
              <Paper
                variant="outlined"
                sx={{ p: 2, bgcolor: 'background.paper' }}
              >
                <code style={{ fontFamily: 'monospace' }}>
                  npm install @midseelee/date-fns-buddhist-adapter
                </code>
              </Paper>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </LocalizationProvider>
  )
}

export default App
