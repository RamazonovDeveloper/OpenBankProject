import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import usePayment from 'src/hooks/usePayment'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import useLoanAgreementFilter from 'src/hooks/useLoanAgreement'
import useAccount from 'src/hooks/useAccount'
import DocumentComponent from 'src/views/apps/home/DocumentComponent'
import TransactionTabContext from 'src/views/apps/home/TransactionTabContext/TransactionTabContext'
import useStorage from 'src/hooks/useStorage'

const Home = () => {
  const router = useRouter()

  const [companyInfo] = useStorage('companyInfo')

  console.log('companyInfo == ', companyInfo)
  const paymentProps = usePayment()

  const { error, setError, rowItems, setDate_from, setPerPage } = paymentProps

  const { accountItems } = useAccount()

  const { loanItems, getLoanItems } = useLoanAgreementFilter()

  console.log('loanItems => ', loanItems)
  console.log('rowItems => ', rowItems)
  console.log('accountItems', accountItems)

  useEffect(() => {
    getLoanItems({
      perPage: 10,
      page: 1
    })

    // let currentDate = new Date().toJSON().slice(0, 10)
    // setDate_from(currentDate)
    setPerPage(5)
  }, [])

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  const transactionPreview = props => {
    console.log(props)

    router.push({
      pathname: `/${companyInfo.slug}/transaction/preview`,
      query: { id: props.id }
    })
  }

  const documentPreview = props => {
    router.push({
      pathname: `/${companyInfo.slug}/documents/preview`,
      query: { id: props.uuid_code }
    })
  }

  const accountPreview = props => {
    router.push({
      pathname: `/${companyInfo.slug}/accounts/preview`,
      query: { id: props.id }
    })
  }

  const DocumentComponentRender = () => {
    return (
      <>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '22px',
            fontWeight: '700',
            color: '#342C2C'
          }}
        >
          Документы
        </Box>
        <Box sx={{ overflowY: 'scroll', height: '446px' }}>
          {loanItems.length > 0 ? (
            <DocumentComponent loanItems={loanItems} handleClick={documentPreview} />
          ) : (
            <Box
              sx={{
                mt: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '454px'
              }}
            >
              {' '}
              <Typography>Нет данных</Typography>
            </Box>
          )}
        </Box>
      </>
    )
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={12} md={12}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Box sx={{ fontSize: '22px', fontWeight: '700', color: '#342C2C' }}>Добрый день</Box>
            <Box sx={{ fontSize: '17px', fontWeight: '400', color: '#777373' }}>
              Посмотрите все финансовые действия по вашей компании
            </Box>
          </Box>
          <button onClick={() => router.push(`/${companyInfo.slug}/transaction/addItem`)} className='main_btn'>
            Создать платеж{' '}
            <span>
              <svg width='17' height='16' viewBox='0 0 17 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M8.01982 0.320007V7.52001H0.819824V8.48001H8.01982V15.68H8.97982V8.48001H16.1798V7.52001H8.97982V0.320007H8.01982Z'
                  fill='white'
                />
              </svg>
            </span>
          </button>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ height: '216px' }}>
          <Box sx={{ mx: '20px', my: '30px' }}>
            <Box sx={{ fontSize: '22px', fontWeight: '700', color: '#342C2C', mb: '20px' }}>Счета</Box>
            <Slider {...settings}>
              {accountItems.length > 0 ? (
                accountItems.map((account, index) => {
                  return (
                    <Box
                      key={index}
                      sx={{ display: 'flex!important', alignItems: 'start', width: 'fit-content', cursor: 'pointer' }}
                      onClick={() => accountPreview(account)}
                    >
                      <img src='/images/carouselItemIcon.png' alt='' />
                      <Box sx={{ ml: '16px' }}>
                        <Box sx={{ color: '#1D1515', fontWeight: 600 }}>{account.balance} UZS</Box>
                        <Box>Название счета</Box>
                        <Box>{account.account}</Box>
                      </Box>
                    </Box>
                  )
                })
              ) : (
                <Box>
                  {' '}
                  <Typography
                    sx={{
                      mt: '5px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    Нет данных
                  </Typography>
                </Box>
              )}
            </Slider>
          </Box>
        </Card>
        <Card sx={{ my: '30px', px: '20px', py: '30px', height: '521px' }}>
          <DocumentComponentRender />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <Card sx={{ height: '767px', padding: '20px' }}>
          <TransactionTabContext {...paymentProps} handleClick={transactionPreview} />
        </Card>
      </Grid>
      <Dialog
        open={error}
        keepMounted
        onClose={() => setError(false)}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>{'Oh no! Something went wrong'}</DialogTitle>
        <DialogActions>
          <Button onClick={() => router.push(`/login`)}>Попробуйте еще раз</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default Home
