// ** React Imports
import Head from 'next/head'
import Script from 'next/script'
import { useRouter } from 'next/router'

import { useState, useEffect } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import Typography from '@mui/material/Typography'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
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

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'

/// Repositories
import Auth from 'src/repositories/AuthRepository'
import Otp from 'src/repositories/OtpRepository'
import Cleave from 'cleave.js/react'

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

const Login = () => {
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
  const [phoneNumber, setPhoneNumber] = useState(null)

  useEffect(() => {
    console.log(phoneNumber)
  }, [phoneNumber])

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

  useEffect(() => {
    let companyInfo = localStorage.getItem('companyInfo')
    if (!companyInfo) router.replace(`/login`)
  }, [])

  const onSubmit = async data => {
    let hash = localStorage.getItem('hash')
    console.log('data', { ...data, phone: phoneNumber, hash, otp: data.code })
    console.log('hasCode', hasCode)
    if (hasCode) {
      let auth = await Auth.login({ phone: phoneNumber, hash, otp: data.code }, ress => {})
      let companyInfo = JSON.parse(localStorage.getItem('companyInfo'))
      companyInfo.inn = auth.data.data.companyTin

      let slug = await companyInfo.slug
      console.log('AUTH', auth)
      console.log('SLUG', slug)

      if (auth) {
        if (auth.data?.success) {
          localStorage.setItem('access_token', JSON.stringify(auth.data.data.access_token))
          localStorage.setItem('refresh_token', JSON.stringify(auth.data.data.refresh_token))
          localStorage.setItem('companyInfo', JSON.stringify(companyInfo))

          router.replace(`/home`)
        }
        console.log('auth ===> ', auth)
        if (auth.response) {
          if (auth.response.data) {
            console.log('errrrrro')
            setError('code', {
              type: 'manual',
              message:
                (auth.data?.message.hasOwnProperty('phone') && auth.data?.message.phone) || auth.response?.data.message

              // auth.response.data.message

              // (auth.data.message.hasOwnProperty('sms') && auth.data.message.sms) ||
              // (auth.data.message.hasOwnProperty('phone') && auth.data.message.phone)
            })

            // setFieldErrors(auth.data?.message)
          }
        }
      }
    } else {
      setCodeSent(true)
      Otp.create({ phone_number: phoneNumber }, ress => {
        console.log('ress ', ress)
        if (ress) {
          if (ress.data?.success) {
            setError('code', {
              type: 'manual',
              message: ress.data.message
            })
            setHasCode(!hasCode)
            setBtnSubmit('Войти')
          }
          if (!ress.data?.success) {
            if (typeof ress.data.message == 'string') {
              setError('phone', {
                type: 'manual',
                message: ress.data.message
              })
            } else {
              setError('phone', {
                type: 'manual',
                message: ress.data.message.phone
              })
            }
          }
          setCodeSent(false)
        }
      })
    }
  }

  const imageSource = skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration'

  return (
    <Box className='content-right'>
      {!hidden ? (
        <Box
          className='login_wrapper'
          sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}
        >
          <div className='login_wrapper_center'>
            <div className='login_wrapper_center_grid'>
              <div>
                <img src='/images/pages/Vector.png' alt='' />
                <p>Документы</p>
              </div>
              <div>
                <img src='/images/pages/Vector2.png' alt='' />
                <p>Платежи</p>
              </div>
              <div>
                <img src='/images/pages/Vector3.png' alt='' />
                <p>Зарплатные проекты</p>
              </div>
              <div>
                <img src='/images/pages/Vector4.png' alt='' />
                <p>Кредиты</p>
              </div>
              <div>
                <img src='/images/pages/Vector5.png' alt='' />
                <p>Налоговые отчеты</p>
              </div>
              <div>
                <img src='/images/pages/Vector6.png' alt='' />
                <p>Картотека</p>
              </div>
            </div>
          </div>
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
              <img width='175' src='/images/pages/white-logo.png' alt='' />
            </Box>
            <form name='testform' noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              {/* <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='phone'
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
                {errors.phone && <FormHelperText sx={{ color: 'error.main' }}>{errors.phone.message}</FormHelperText>}
              </FormControl> */}
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Typography sx={{ color: '#777373' }}>Введите номер телефона</Typography>
                <Controller
                  name='phone'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <Cleave
                      className='form-control'
                      placeholder='Enter your credit card number'
                      options={{
                        prefix: '+998',
                        delimiters: [' ', '(', ') ', '-'],
                        blocks: [4, 0, 2, 3, 2, 2]
                      }}
                      onChange={event => setPhoneNumber(`+${event.target.rawValue.substr(1)}`)}
                    />
                  )}
                />
                {errors.phone && <FormHelperText sx={{ color: 'error.main' }}>{errors.phone.message}</FormHelperText>}
              </FormControl>
              {hasCode && (
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Typography sx={{ color: '#777373' }}>Введите код из СМС</Typography>

                  <Controller
                    name='code'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        autoFocus
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
              {fieldErrors && <Typography sx={{ mb: 3, color: 'text.danger' }}>{fieldErrors}</Typography>}
              {companyStatus ? (
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                  <Typography sx={{ mr: 2, color: 'text.secondary' }}>{companyStatus}</Typography>
                  <Typography
                    className='violet_button'
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
                  className='violet_button'
                  loading={codeSent}
                >
                  {btnSubmit}
                </LoadingButton>
              )}
            </form>
            <Box
              sx={{
                bottom: 50,
                right: 40,
                display: 'flex',
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: 380
              }}
            >
              <Typography sx={{ mr: 2, color: 'primary.secondary' }}>+998 94-007-3609</Typography>
              <Typography href='/login' component={Link} sx={{ color: 'primary.secondary', textDecoration: 'none' }}>
                openbank.uz
              </Typography>
            </Box>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  )
}
Login.getLayout = page => <BlankLayout>{page}</BlankLayout>
Login.guestGuard = true

export default Login
