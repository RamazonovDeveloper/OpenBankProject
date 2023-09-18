import React from 'react'
import { useState } from 'react'

import { TabContext, TabList, TabPanel } from '@mui/lab'
import { CardContent, Tab } from '@mui/material'
import TableBasic from 'src/views/table/TableBasic'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import TakeCreditAbout from './takeCreditItem/TakeCreditAbout'
import TakeCreditOperations from './takeCreditItem/operations/TakeCreditOperations'
import TakeCreditPayments from './takeCreditItem/TakeCreditPayments'

function TakeCreditItemTabList() {
  const router = useRouter()

  const companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

  const handleClick = route => {
    router.push(`/${companyInfo.slug}/credits/preview/${1}`)
  }

  const [value, setValue] = useState('1')

  const handleTabsChange = (event, newValue) => {
    setValue(newValue)
  }

  const contractDataRows = [
    {
      col_name: 'Бизнес ипотека',
      main_doubt: '100 000 000.00 UZS',
      nearest_payment: '100 000.00 UZS',
      date: '25.04.2023',
      overdate_amuont: '100 000.00 UZS'
    },
    {
      col_name: 'Лизинг',
      main_doubt: '100 000 000.00 UZS',
      nearest_payment: '100 000.00 UZS',
      date: '25.04.2023'

      // overdate_amuont:"100 000.00 UZS"
    },
    {
      col_name: 'Оборотные средства',
      main_doubt: '100 000 000.00 UZS',
      nearest_payment: '100 000.00 UZS',
      date: '25.04.2023'

      // overdate_amuont:"100 000.00 UZS"
    }
  ]

  const contractDataColumns = [
    {
      id: 'col_name',
      title: 'Имя',
      align: '',
      minWidth: 200
    },
    {
      id: 'main_doubt',
      title: 'Основной долг',
      align: '',
      minWidth: 200
    },
    {
      id: 'nearest_payment',
      title: 'Ближайший платеж',
      align: '',
      minWidth: 200
    },
    {
      id: 'overdate_amuont',
      title: 'Просроченная сумма',
      align: '',
      minWidth: 170
    }
  ]

  const aplicationDataRows = [
    {
      date: '25.04.2023',
      product: 'Бизнес ипотека АКБ“Капиталбанк”',
      rate: '4%',
      credit_amount: '100 000 000.00 UZS',
      deadline: '5 лет',
      status: 'На рассмотрении'
    },
    {
      date: '25.04.2023',
      product: 'Лизинг АКБ“Капиталбанк”',
      rate: '4%',
      credit_amount: '100 000 000.00 UZS',
      deadline: '5 лет',
      status: 'Отказано'
    },
    {
      date: '25.04.2023',
      product: 'Оборотные средства АКБ“Капиталбанк”',
      rate: '4%',
      credit_amount: '100 000 000.00 UZS',
      deadline: '5 лет',
      status: 'Одобрено'
    }
  ]

  const aplicationDataColumns = [
    {
      id: 'date',
      title: 'Дата',
      align: '',
      minWidth: 120
    },
    {
      id: 'product',
      title: 'Продукт',
      align: '',
      minWidth: 200
    },
    {
      id: 'rate',
      title: 'Ставка',
      align: '',
      minWidth: 80
    },
    {
      id: 'credit_amount',
      title: 'Сумма кредита',
      align: '',
      minWidth: 200
    },
    {
      id: 'deadline',
      title: 'Срок кредита',
      align: '',
      minWidth: 200
    },
    {
      id: 'status',
      title: 'Статус',
      align: '',
      minWidth: 200
    }
  ]

  return (
    <div>
      <TabContext style={{ paddingLeft: '0' }} value={value}>
        <TabList
          variant='scrollable'
          scrollButtons={false}
          onChange={handleTabsChange}
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab value='1' label='О кредите' />
          <Tab value='2' label='Операции' />
          <Tab value='3' label='Платежи' />
        </TabList>
        <CardContent style={{ width: '80%', paddingLeft: '0' }}>
          <TabPanel value='1'>
            <TakeCreditAbout />
            {/* <TableBasic rows={contractDataRows} columns={contractDataColumns} handleClick={handleClick} /> */}
          </TabPanel>

          <TabPanel value='2'>
            <TakeCreditOperations />
            {/* <TableBasic rows={aplicationDataRows} columns={aplicationDataColumns} handleClick={handleClick} /> */}
            {/* <Typography variant='subtitle1'>Нет данных</Typography> */}
          </TabPanel>

          <TabPanel value='3'>
            <TakeCreditPayments />
            {/* <Typography variant='subtitle1'>Нет данных</Typography> */}
          </TabPanel>
        </CardContent>
      </TabContext>
    </div>
  )
}

export default TakeCreditItemTabList
