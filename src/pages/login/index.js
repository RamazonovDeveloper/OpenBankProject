// ** React Imports
import Head from 'next/head'
import Script from 'next/script'
import { useRouter } from 'next/router'

import { useState, useEffect } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import Typography from '@mui/material/Typography'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

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

/// ** E-Imzo
import EIMZO from 'src/lib/Eimzo'

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

const LoginPage = () => {
  const router = useRouter()
  const [rememberMe, setRememberMe] = useState(true)
  const [keyStatus, setKey] = useState(null)

  const [loadKeyStatus, setLoadKeySatus] = useState({
    status: false,
    message: null
  })

  // ** Hooks
  const auth = useAuth()
  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const [certificates, setCertificates] = useState([])
  const [choosenCert, setChoosenCert] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [hash, setHash] = useState(null)
  const [file, setFile] = useState(null)
  const EIMZOClient = new EIMZO()

  useEffect(() => {
    const listAllKeys = async () => {
      const certs = await EIMZOClient.install()
      const data = await EIMZOClient.listAllUserKeys()
      console.log(data)
      setCertificates(data)
    }
    listAllKeys()
  }, [])

  // ** Vars
  const { skin } = settings

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur'
  })

  const timestamper = (e, callBack) => {
    const timeStapm = EIMZOClient.getTimestampTokenRequestForSignature(e)
    timeStapm.then(data => {
      console.log('time kelgan if data', data)
      if (data.success) {
        callBack(data.timestamp_request_64)
      }
    })
  }

  const onSubmit = async data => {
    console.log(choosenCert)

    let itm = certificates.filter(item => {
      return item.TIN == choosenCert
    })[0]
    console.log('itm', itm)

    if (itm) {
      setError(null)

      // need refactoring ..
      if (false) {
        const create = await EIMZOClient.createPkcs7()
      } else {
        setLoadKeySatus({ status: true, message: 'Введите пароль ключа' })

        console.log('loadKey START')

        let keyResID

        const loadKey = await EIMZOClient.loadKey(itm)
          .then(keyRes => {
            console.log('keyRes', keyRes)
            keyResID = keyRes.id

            return keyRes
          })
          .catch(err => {
            console.log('Oh noooo!!')
            console.log(err)
          })

        if (!loadKey) {
          setError('stc_key', {
            type: 'stc_key',
            message: 'Неверный пароль'
          })

          return
        }

        setLoadKeySatus({ status: false, message: null })
        console.log(file)

        // const reader = new FileReader()
        // reader.onloadend = () => {
        //   console.log('reader.result', reader.result)

        //   // Logs data:<type>;base64,wL2dvYWwgbW9yZ...
        // }

        // reader.readAsDataURL(file)

        // let fileLocal = localStorage.getItem('file')

        const create = await EIMZOClient.createPkcs7(loadKey.id, loadKey.cert, null)
        console.log('create', create)
        localStorage.setItem('hash', create)

        // let pkcs7_64 = localStorage.getItem('hash')

        // console.log('pkcs7_64, keyResID', pkcs7_64, keyResID)
        // const append_pkcs7_attached = await EIMZOClient.appendPkcs7Attached(pkcs7_64, keyResID)
        // console.log('append_pkcs7_attached', append_pkcs7_attached)

        // setHash(create)

        let companyInfo = await Company.companyInfo({ hash: create })

        // let companyInfo = await auth.register({ hash: create })
        console.log('companyInfo => ', companyInfo)

        // setError('stc_key', 'RELOADING')

        if (companyInfo) {
          // if (companyInfo.status === 412) {
          //   router.replace(`/accept`)

          //   return
          // }

          if (companyInfo.status === 404) {
            router.replace(`/register`)

            return
          }
          if (companyInfo.status === 406) {
            router.replace(`/auth`)
            localStorage.setItem('companyInfo', JSON.stringify(companyInfo.data))

            return
          }

          if (companyInfo.data.success) {
            console.log('success')
            localStorage.setItem('companyInfo', JSON.stringify(companyInfo.data.data))
            router.replace(`/auth`)
          } else {
            console.log('error', companyInfo.data)
            setLoadKeySatus({ status: true, message: companyInfo.data.message })
            console.log('AAAAA', companyInfo.data.message)
            setError('stc_key', {
              type: 'stc_key',
              message: companyInfo.data.message
            })
          }
        }
      }
    } else {
      setError('stc_key', {
        type: 'stc_key',
        message: 'Пожалуйста, выберите ключ ЭЦП для входа.'
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
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              {/* <Controller
                name='stc_key'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    onChange={e => {
                      setChoosenCert(e.target.value)
                    }}
                    fullWidth
                    size='small'
                    label='Выбор  ЭЦП'
                    value={choosenCert}
                  >
                    {certificates &&
                      certificates.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.TIN}>
                            {item.CN}
                          </MenuItem>
                        )
                      })}
                  </Select>
                )}
              />
              {errors.stc_key && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.stc_key.message}</FormHelperText>
              )} */}
              <Typography sx={{ fontSize: '24px', color: '#4A4444', mb: '45px' }}>
                Войти или зарегистрироваться
              </Typography>
              <FormControl size='medium' fullWidth sx={{ mb: 4 }}>
                <InputLabel id='demo-simple-select-label'>Выбор ЭЦП</InputLabel>
                <Select
                  name='stc_key'
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={choosenCert}
                  label='Выбор  ЭЦП'
                  onChange={e => {
                    setChoosenCert(e.target.value)
                  }}
                >
                  {certificates &&
                    certificates.map((item, index) => {
                      return (
                        <MenuItem sx={{ display: 'block', textAlign: 'start' }} key={index} value={item.TIN}>
                          {item.serialNumber && (
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <Typography variant='subtitle2' gutterBottom>
                                № СЕРТИФИКАТА:
                              </Typography>
                              <Typography variant='subtitle1' gutterBottom>
                                {item.serialNumber}
                              </Typography>
                            </Box>
                          )}
                          {item.CN && (
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <Typography variant='subtitle2' gutterBottom>
                                Ф.И.О.:
                              </Typography>
                              <Typography variant='subtitle1' gutterBottom>
                                {item.CN}
                              </Typography>
                            </Box>
                          )}
                          {item.O && (
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <Typography variant='subtitle2' gutterBottom>
                                Организация.:
                              </Typography>
                              <Typography variant='subtitle1' gutterBottom>
                                {item.O}
                              </Typography>
                            </Box>
                          )}
                          <Divider />
                        </MenuItem>
                      )
                    })}
                </Select>
                {errors.stc_key && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.stc_key.message}</FormHelperText>
                )}
                {loadKeyStatus.status ||
                  (!errors.stc_key && (
                    <FormHelperText sx={{ color: 'warning.main' }}>{loadKeyStatus.message}</FormHelperText>
                  ))}
              </FormControl>
              <Button className='violet_button' fullWidth size='large' type='submit' variant='contained'>
                <img width='24' style={{ marginRight: 12 }} src='/images/pages/e-imzo-logo.png' alt='' />
                Продолжить с ЭЦП
              </Button>
              <Typography sx={{ fontSize: '15px', color: '#777373', mt: '8px' }}>
                Далее вы будете перенаправлены на сайт “E-imzo”
              </Typography>
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
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
LoginPage.guestGuard = true

export default LoginPage
