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
    setPerPage(6)
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
      pathname: `/transaction/preview`,
      query: { id: props.id, item: '№ платежного поручения: ' + props.external_id }
    })
  }

  const documentPreview = props => {
    router.push({
      pathname: `/documents/preview`,
      query: { id: props.uuid_code, item: 'Документ: ' + props.name }
    })
  }

  const accountPreview = props => {
    router.push({
      pathname: `/accounts/preview`,
      query: { id: props.id, item: 'Расчетный счет: ' + props.account }
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
        <Box sx={{ overflowY: 'scroll', height: '258px' }}>
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
          <button onClick={() => router.push(`/transaction/newtransaction`)} className='main_btn'>
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
      <Grid item xs={12} sm={6} md={5}>
        <Card>
          <Box sx={{ mx: '20px', my: '20px' }}>
            <Box sx={{ fontSize: '22px', fontWeight: '700', color: '#342C2C', mb: '20px' }}>Счета</Box>
            <Box sx={{ overflowY: 'scroll', height: '305px' }}>
              {accountItems.length > 0 ? (
                accountItems.map((account, index) => {
                  return (
                    <Box
                      key={index}
                      sx={{
                        cursor: 'pointer',
                        borderBottom: '2px solid rgba(244, 243, 243, 1)',
                        mb: '16px',
                        pb: '16px'
                      }}
                      onClick={() => accountPreview(account)}
                    >
                      <svg width='83' height='16' viewBox='0 0 83 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <g clip-path='url(#clip0_915_9228)'>
                          <path d='M0 16H8L0 8V16Z' fill='#4FB267' />
                          <path d='M8 16H16V8L8 16Z' fill='#4FB267' />
                          <path d='M8 0L16 8V0H8Z' fill='#4FB267' />
                          <path d='M0 0V8L8 0H0Z' fill='#4FB267' />
                          <path
                            d='M23.2495 3.79541V5.12254H24.9115L22.0898 11.9939H24.1488L24.7751 10.307H28.2914L28.9302 11.9939H31.0635L27.696 3.79541H23.2433H23.2495ZM25.3457 8.81867L26.524 5.67448L27.7271 8.81867H25.3519H25.3457Z'
                            fill='#010101'
                          />
                          <path
                            d='M36.2045 6.81554C35.9255 6.35042 35.2929 5.83569 34.2821 5.83569C32.7193 5.83569 31.4976 6.95197 31.4976 8.87445C31.4976 10.7969 32.7193 11.8946 34.2821 11.8946C35.2185 11.8946 35.82 11.4543 36.1363 11.0202V11.5721C36.1363 12.676 35.2495 13.0667 34.3441 13.0667C33.5317 13.0667 32.7317 12.831 32.0619 12.3659V13.8419C32.6883 14.214 33.5193 14.4496 34.6479 14.4496C36.5456 14.4496 38.003 13.4822 38.003 11.6031V5.97833H36.2107V6.82174L36.2045 6.81554ZM34.7844 10.4807C33.9348 10.4807 33.3766 9.8419 33.3766 8.87445C33.3642 7.88221 33.9348 7.26825 34.7844 7.26825C35.2867 7.26205 35.7704 7.4481 36.1363 7.79538V9.94732C35.7766 10.2946 35.2867 10.4869 34.7844 10.4807Z'
                            fill='#010101'
                          />
                          <path
                            d='M42.1211 7.32391L41.8296 5.97197H39.0327V7.23089H40.2792V11.9937H42.1521V8.29135C42.4188 7.85725 42.9459 7.52236 43.9133 7.52236C44.1614 7.52236 44.4095 7.55337 44.6451 7.61538V5.94097C44.4777 5.87275 44.2978 5.84174 44.1242 5.84794C42.9211 5.84794 42.2699 6.56112 42.1211 7.32391Z'
                            fill='#010101'
                          />
                          <path
                            d='M48.6137 5.83569C46.6664 5.83569 45.2339 7.09461 45.2339 8.99228C45.2339 10.89 46.6664 12.1365 48.6137 12.1365C50.561 12.1365 51.9812 10.89 51.9812 8.99228C51.9812 7.09461 50.5362 5.83569 48.6137 5.83569ZM48.6137 10.6729C47.7145 10.6729 47.113 9.97213 47.113 8.99228C47.113 8.01244 47.7207 7.29926 48.6137 7.29926C49.5068 7.29926 50.1083 8.00003 50.1083 8.98608C50.1083 9.97213 49.5006 10.6667 48.6137 10.6667'
                            fill='#010101'
                          />
                          <path
                            d='M56.5953 5.83554C56.248 5.82314 55.9069 5.89756 55.5968 6.04019C55.2868 6.18903 55.0139 6.40608 54.803 6.67895V3.52856H52.9302V11.9999H54.7224V11.1875C55.0201 11.6526 55.6341 12.1425 56.5953 12.1425C58.1581 12.1425 59.3798 10.9766 59.3798 8.99833C59.3798 7.02004 58.1581 5.84174 56.5953 5.84174V5.83554ZM56.093 10.6728C55.6154 10.6728 55.1503 10.4991 54.803 10.1704V7.81384C55.1503 7.47895 55.6154 7.29911 56.093 7.30531C56.955 7.30531 57.5007 7.96887 57.5007 8.99213C57.5007 10.0154 56.955 10.6728 56.093 10.6728Z'
                            fill='#010101'
                          />
                          <path
                            d='M66.2079 10.4868V8.19218C66.2079 6.73482 65.0916 5.8418 63.287 5.8418C62.1707 5.8418 61.3645 6.08366 60.7691 6.44955V7.91932C61.4141 7.4728 62.1831 7.23094 62.9707 7.23094C63.8017 7.23094 64.3908 7.54722 64.3908 8.35963V8.51466C63.9567 8.40304 63.5102 8.34722 63.0637 8.34722C61.5939 8.34722 60.2544 8.93017 60.2544 10.2697C60.2544 11.3674 61.2342 12.1426 62.5366 12.1426C63.566 12.1426 64.118 11.7891 64.4528 11.3426C64.6451 11.8821 65.2404 12.1426 65.8296 12.1426C66.2141 12.1612 66.5986 12.0744 66.9459 11.9069V10.8278C66.8466 10.8589 66.7474 10.8713 66.642 10.8775C66.3939 10.8775 66.2017 10.772 66.2017 10.493L66.2079 10.4868ZM63.1195 10.8713C62.5118 10.8713 62.1273 10.5922 62.1273 10.1705C62.1273 9.62474 62.7536 9.4387 63.3118 9.4387C63.6714 9.4387 64.0311 9.48831 64.3784 9.58753V10.3007C64.2234 10.4868 64.0311 10.6356 63.8079 10.7348C63.5908 10.834 63.349 10.8837 63.1071 10.8713'
                            fill='#010101'
                          />
                          <path
                            d='M72.1365 5.83576C71.7334 5.82956 71.3303 5.91638 70.9706 6.09622C70.6109 6.27607 70.2946 6.53653 70.0528 6.85902L69.8667 5.97219H67.0698V7.23111H68.3163V11.9939H70.1892V7.80165C70.4559 7.51018 70.89 7.36134 71.3551 7.36134C72.1117 7.36134 72.5396 7.73343 72.5396 8.52723V12.0001H74.4125V7.9939C74.4125 6.58615 73.4326 5.83576 72.1303 5.83576'
                            fill='#010101'
                          />
                          <path
                            d='M82.4682 11.9813V10.741H81.6062L80.1612 8.66965L82.0589 5.97818H80.186L78.6604 8.16732H77.8294V3.52856H75.9565V11.9999H77.8294V9.50686H78.6728L80.3286 11.9999H82.4806L82.4682 11.9813Z'
                            fill='#010101'
                          />
                        </g>
                        <defs>
                          <clipPath id='clip0_915_9228'>
                            <rect width='82.4806' height='16' fill='white' />
                          </clipPath>
                        </defs>
                      </svg>
                      <Box>{account.mfo}</Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>{account.account}</Box>
                        <Box sx={{ color: '#1D1515', fontWeight: 600 }}>{account.balance} UZS</Box>
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
                      justifyContent: 'center',
                      height: '305px'
                    }}
                  >
                    Нет данных
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Card>
        <Card sx={{ my: '20px', px: '20px', py: '20px' }}>
          <DocumentComponentRender />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={7}>
        <Card sx={{ height: '750px', padding: '20px' }}>
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
