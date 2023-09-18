import React, { useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Icon from 'src/@core/components/icon'
import Card from '@mui/material/Card'
import Image from 'next/image'
import LogoIcon from 'public/images/favicon.png'
import Styles from './credit.module.css'

// import CardHeader from '@mui/material/CardHeader'
// import CardContent from '@mui/material/CardContent'
// import { DataGrid } from '@mui/x-data-grid'
// import Accounts from 'src/views/dashboards/accounts/Accounts'

// MODAL
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import CreditHeader from 'src/views/apps/credits/CreditHeader'
import CreditTabList from 'src/views/apps/credits/CreditTabList'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 850,
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 24,
  p: 4
}

const columns = [
  {
    field: 'contragent',
    headerName: 'Счёт',
    width: 380,
    editable: true,
    renderCell: params => {
      return (
        <Box>
          <Typography variant='body2' gutterBottom>
            {params.row.contragent[0]}
          </Typography>
          <Typography variant='subtitle2' gutterBottom>
            {params.row.contragent[1]}
          </Typography>
        </Box>
      )
    }
  },
  {
    field: 'sum',
    headerName: 'Остаток',
    width: 230,
    editable: true
  },
  {
    field: 'status',
    headerName: 'Тип',
    width: 200,
    editable: true
  },
  {
    field: 'level',
    headerName: 'Состояние',
    width: 200,
    editable: true
  },
  {
    field: 'action',
    headerName: '',
    width: 100,
    editable: true,
    renderCell: params => {
      return (
        <div>
          <IconButton onClick={() => console.log(params)} color='inherit' sx={{ ml: -2.75 }}>
            <Icon icon='mdi:dots-horizontal-circle-outline' />
          </IconButton>
        </div>
      )
    }
  }
]

const rows = [
  {
    id: 1,
    date: '13.12.2022',
    contragent: ['40702.810.9.11717973736', "ООО 'ТЕСТ'", 'В том числе НДС 20% 2000 рублей.'],
    sum: '10 000,00 UZS',
    status: 'Расчётный',
    level: 'Открыт'
  },
  {
    id: 2,
    date: '13.12.2022',
    contragent: ['40702.810.9.11717973736', "ООО 'ТЕСТ'", 'В том числе НДС 20%  2000 рублей.'],
    sum: '10 000,00 UZS',
    status: 'Расчётный',
    level: 'Открыт'
  },
  {
    id: 3,
    date: '13.12.2022',
    contragent: ['40702.810.9.11717973736', "ООО 'ТЕСТ'", 'Оплата услуг'],
    sum: '1 700,00 UZS',
    status: 'Расчётный',
    level: 'Открыт'
  },
  {
    id: 4,
    date: '13.12.2022',
    contragent: ['40702.810.9.11717973736', "ООО 'ТЕСТ'", 'Оплата услуг'],
    sum: '2 500,00 UZS',
    status: 'Расчётный',
    level: 'Открыт'
  }
]

const Credits = () => {
  // MODAL FUNCTION
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const MassIcon = [
    {
      name: 'Купить товары или оплатить услуги',
      btn: 'Выбрать',
      icons: 'icons8:buy'
    },
    {
      name: 'Купить недвижимость',
      btn: 'Выбрать',
      icons: 'iconoir:home-sale'
    },
    {
      name: 'Купить недвижимость',
      btn: 'Выбрать',
      icons: 'mdi:car-2-plus'
    },
    {
      name: 'Приобрести оборудование',
      btn: 'Выбрать',
      icons: 'game-icons:pulley-hook'
    },
    {
      name: 'Погашение кредита в другом банке',
      btn: 'Выбрать',
      icons: 'mdi:bank-plus'
    },
    {
      name: 'Строительство и ремонт',
      btn: 'Выбрать',
      icons: 'ic:baseline-home-repair-service'
    },
    {
      name: 'Другие услуги',
      btn: 'Выбрать',
      icons: 'carbon:ibm-security-services'
    },
    {
      name: 'Банковская гарантия',
      btn: 'Выбрать',
      icons: 'clarity:bank-outline-badged'
    },
    {
      name: 'Овердрафт',
      btn: 'Выбрать',
      icons: 'mdi:progress-star'
    },
    {
      name: 'Погашение дебиторской задолженности',
      btn: 'Выбрать',
      icons: 'wpf:paid'
    }
  ]

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <CreditHeader />
        {/* <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='h5' sx={{ mr: 1.75 }}>
            Онлайн кредит
          </Typography>
        </Box> */}
      </Grid>

      <Grid item xs={12}>
        <CreditTabList />
        {/* <Box sx={{ mt: 5, display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex' }}>
            <Button variant='contained' sx={{ mr: 4 }}>
              Договоры
            </Button>
            <Button variant='outlined' sx={{ mr: 4 }}>
              Заявки
            </Button>
            <Button variant='outlined'>Сообщения</Button>
            <Button variant='outlined'>Ramazonov Developer</Button>
          </Box>
          <Button onClick={() => handleOpen()} variant='contained'>
            Создать заявку
          </Button>
          


          <Box>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <Box sx={style}>
                <Typography className={Styles.ImgBlock} id='modal-modal-title' variant='h6' component='h2'>
                  <Box sx={{ display: 'flex' }}>
                    <Image className={Styles.LogoIcon} src={LogoIcon} alt='' />{' '}
                    <Typography variant='h5'>Open bank</Typography>
                  </Box>
                  <Typography variant='h6' sx={{ fontWeight: '700' }}>
                    Кредитные продукты
                  </Typography>
                </Typography>
                <hr />
                <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                  <Typography variant='h7' sx={{ my: 20, fontWeight: '700' }}>
                    Выберите, на что нужны деньги
                  </Typography>
                  <Grid className={Styles.ModalListBlock}>
                    {MassIcon.length > 0 &&
                      MassIcon.map((item, index) => {
                        return (
                          <Box key={index} className={Styles.createModal} sx={{ borderBottom: '0.5px solid #ababab' }}>
                            <Box key={index} className={Styles.ModalListInit}>
                              <Box
                                sx={{
                                  margin: '10px',
                                  fontSize: '14px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  color: 'black',
                                  gap: '10px'
                                }}
                              >
                                <Icon style={{ fontSize: '33px', color: '#ababab' }} icon={item.icons} />
                                {item.name}
                              </Box>
                              <Button className={Styles.ModalButton}>{item.btn}</Button>
                            </Box>
                          </Box>
                        )
                      })}
                  </Grid>
                  <Typography variant='h7' sx={{ my: 50, fontWeight: '700' }}>
                    <p>Выберите, на что нужны деньги</p>
                  </Typography>
                </Typography>
              </Box>
            </Modal>
          </Box>
        </Box> */}
      </Grid>
    </Grid>
  )
}

export default Credits
