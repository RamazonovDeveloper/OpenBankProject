// ** React Imports
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

/// Repositories
import Company from 'src/repositories/CompanyRepository'
import Invitation from 'src/repositories/Invitation'

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

const Accept = () => {
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
  const companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

  const { skin } = settings
  useEffect(() => {
    console.log('Accept companyInfo => ', companyInfo)
  }, [])

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur'
  })

  const onSubmit = async data => {}

  const imageSource = skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration'

  const acceptInvitation = async () => {
    const invitation = await Invitation.acceptInvitation()
    console.log('invitation', invitation)
  }

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
              <Box
                sx={{
                  fontSize: '20px',
                  color: 'rgba(0, 0, 0, 1)',
                  mb: '45px',
                  lineHeight: '25px',
                  letterSpacing: '0.38 px'
                }}
              >
                Директор компании "{companyInfo.name}" {companyInfo.owner_phone} назначил вас бухгалтером компании
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <button className='main_btn gray_btn' type='submit'>
                  Отклонить
                </button>
                <button className='main_btn' onClick={() => acceptInvitation()}>
                  Принять
                </button>
              </Box>
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
Accept.getLayout = page => <BlankLayout>{page}</BlankLayout>
Accept.guestGuard = true

export default Accept
