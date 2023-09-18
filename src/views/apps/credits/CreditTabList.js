import React from 'react'
import { useState } from 'react'

import { TabContext, TabList, TabPanel } from '@mui/lab'
import { CardContent, Tab } from '@mui/material'
import TableBasic from 'src/views/table/TableBasic'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import OriginalCredit from './preview/originalTakeCredit/OriginalCredit'

// import OriginalCredit from './preview/originalTakeCredit/originalCredit'

function CreditTabList() {
  const [value, setValue] = useState('1')

  const handleTabsChange = (event, newValue) => {
    setValue(newValue)
  }

  const companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

  const handleClick = e => {
    router.push(`/${companyInfo.slug}/credits/preview/${1}`)
  }

  // const handleClick = e => {
  //   router.push(`/credits/preview/${1}`)
  // }

  const router = useRouter()

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
      <TabContext value={value}>
        <TabList
          variant='scrollable'
          scrollButtons={false}
          onChange={handleTabsChange}
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab value='1' label='Подобрать кредит' />
          <Tab value='2' label='Текущие заявки' />
          <Tab value='3' label='Текущие договоры' />
        </TabList>
        <CardContent>
          <TabPanel value='1'>
            <OriginalCredit />
            {/* <Typography variant='subtitle1'>Нет данных</Typography> */}
          </TabPanel>

          <TabPanel value='2'>
            <TableBasic rows={aplicationDataRows} columns={aplicationDataColumns} />
          </TabPanel>

          <TabPanel value='3'>
            <TableBasic rows={contractDataRows} columns={contractDataColumns} handleClick={handleClick} />
          </TabPanel>
        </CardContent>
      </TabContext>
    </div>
  )
}

export default CreditTabList
