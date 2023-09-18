// ** React Imports
import Head from 'next/head'
import Script from 'next/script'
import { useRouter } from 'next/router'

import { useState, useEffect } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import useBgColor from 'src/@core/hooks/useBgColor'
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'

/// Repositories
import Company from 'src/repositories/CompanyRepository'

// ** Styled Components
const LoginIllustrationWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: '0 !important',
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(10)
  }
}))

const LoginIllustration = styled('img')(({ theme }) => ({
  maxWidth: '48rem',
  [theme.breakpoints.down('xl')]: {
    maxWidth: '38rem'
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '30rem'
  }
}))

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 400
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 450
  }
}))

const BoxWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('md')]: {
    maxWidth: 400
  }
}))

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.18px',
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required()
})

const defaultValues = {
  password: 'admin',
  email: 'admin@opentech.uz'
}

const CabinetCreate = () => {
  const router = useRouter()
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [age, setAge] = useState('')
  const [codeSent, setCodeSent] = useState(false)
  const [companyStatus, setCompanyStatus] = useState(null)
  const [hasCode, setHasCode] = useState(false)
  const [btnSubmit, setBtnSubmit] = useState('Получить код')
  const [fieldErrors, setFieldErrors] = useState(null)
  const [companyCreateStatus, setCompanyCreateStatus] = useState(null)

  // ** Hooks
  const auth = useAuth()
  const theme = useTheme()
  const bgColors = useBgColor()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = async data => {
    console.log(data)
    if (hasCode) {
      let hash = localStorage.getItem('hash')
      Company.companyCreate({ ...data, hash }, ress => {
        if (ress) {
          console.log('companyCreate', ress)
          if (ress.data.success) {
            localStorage.setItem('companyInfo', JSON.stringify(ress.data.data))

            setTimeout(() => {
              router.replace(`/${ress.data.data.slug}/login`)
            }, 3000)
          }
          if (!ress.data.success) {
            setFieldErrors(data)
          }
          setCompanyStatus(ress.data.message)
        }
      })
    } else {
      setCodeSent(true)
      Company.otpCreate({ phone_number: data.phone_number }, ress => {
        console.log('ress ', ress)
        if (ress) {
          if (ress.data.success) {
            setError('code', {
              type: 'manual',
              message: ress.data.message
            })
            setHasCode(!hasCode)
            setBtnSubmit('Подтвердить')
          }
          if (!ress.data.success) {
            setError('phone_number', {
              type: 'manual',
              message: ress.data.message != 'error' ? ress.data.message : ress.data.data.phone_number
            })
          }
          setCodeSent(false)
        }
      })
    }

    // const { password } = data
    // let email = 'admin@materialize.com'
    // auth.login({ email, password, rememberMe }, () => {
    //   setError('email', {
    //     type: 'manual',
    //     message: 'Email or Password is invalid'
    //   })
    // })
  }

  const imageSource = skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration'

  return (
    <Box className='content-right'>
      {!hidden ? (
        <Box sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
          <LoginIllustrationWrapper>
            <LoginIllustration alt='login-illustration' src={`/images/pages/0277 1.png`} />
          </LoginIllustrationWrapper>
          <FooterIllustrationsV2 />
        </Box>
      ) : null}
      <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
        <Box
          sx={{
            p: 7,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'background.paper'
          }}
        >
          <BoxWrapper>
            <Box
              sx={{
                top: 30,
                left: 40,
                display: 'flex',
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img width='200' src='/images/pages/Logo-Open_Banking.png' alt='' />
            </Box>
            <form name='testform' noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              {/* <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='name'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoFocus
                      onBlur={onBlur}
                      onChange={onChange}
                      label='Название компании'
                      value={value}
                      error={Boolean(errors.email)}
                    />
                  )}
                />
                {errors.company_name && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.company_name.message}</FormHelperText>
                )}
              </FormControl> */}
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='phone_number'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoFocus
                      label='Номер телефона'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.email)}
                      placeholder='+998'
                    />
                  )}
                />
                {errors.phone_number && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.phone_number.message}</FormHelperText>
                )}
              </FormControl>
              {hasCode && (
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Controller
                    name='code'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        autoFocus
                        label='Введите СМС-код'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.code)}
                      />
                    )}
                  />
                  {errors.code && <FormHelperText sx={{ color: 'error.main' }}>{errors.code.message}</FormHelperText>}
                </FormControl>
              )}
              <Box
                sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
              >
                {fieldErrors?.hash && <Typography sx={{ mb: 3, color: 'text.danger' }}>{fieldErrors}</Typography>}
                <FormControlLabel
                  label='Запомните меня'
                  control={<Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />}
                />
              </Box>
              {companyStatus ? (
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                  <Typography sx={{ mr: 2, color: 'text.secondary' }}>{companyStatus}</Typography>
                  <Typography
                    href='/cabinet/login'
                    component={Link}
                    sx={{ color: 'primary.main', textDecoration: 'none' }}
                  >
                    Войти
                  </Typography>
                </Box>
              ) : (
                <LoadingButton
                  fullWidth
                  size='large'
                  type='submit'
                  variant='contained'
                  sx={{ mb: 7 }}
                  loading={codeSent}
                >
                  {btnSubmit}
                </LoadingButton>
              )}
            </form>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  )
}
CabinetCreate.getLayout = page => <BlankLayout>{page}</BlankLayout>
CabinetCreate.guestGuard = true

export default CabinetCreate
