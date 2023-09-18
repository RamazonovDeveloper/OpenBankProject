import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import CardContent from '@mui/material/CardContent'
import TableBasic from 'src/views/table/TableBasic'
import Typography from '@mui/material/Typography'

const columns = [
  {
    id: 'dealNomer',
    title: '№',
    align: '',
    minWidth: 200
  },
  {
    id: 'account_number',
    title: 'Счёт',
    align: '',
    minWidth: 200
  },
  {
    id: 'date',
    title: 'Дата',
    align: 'right',
    minWidth: 170
  },
  {
    id: 'type_deposite',
    title: 'ВИД ДЕПОЗИТА',
    align: 'right',
    minWidth: 170
  },
  {
    id: 'sum',
    title: 'НАКОПЛЕННАЯ СУММА',
    align: 'right',
    minWidth: 170
  },
  {
    id: 'depositSum',
    title: 'СУММА ДЕПОЗИТА	',
    align: 'right',
    minWidth: 170
  },
  {
    id: 'status',
    title: 'СТАТУС',
    align: 'right',
    minWidth: 170
  }
]

const rows = [
  {
    id: 1,
    dealNomer: '142104',
    date: '13.12.2022',
    account_number: 23120000002560000257,
    sum: '4 300 000,00 UZS',
    depositSum: '100 000 000,00 UZS',
    type_deposite: 'Срочный',
    status: 'Активный'
  }
]

const DepositTabLists = () => {
  const [value, setValue] = useState('1')

  const handleTabsChange = (event, newValue) => {
    setValue(newValue)
  }

  const router = useRouter()

  const handleClick = e => {
    router.push(`/depozit/preview/${1}`)
  }

  return (
    <TabContext value={value}>
      <TabList
        variant='scrollable'
        scrollButtons={false}
        onChange={handleTabsChange}
        sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
      >
        <Tab value='1' label='Bce' />
        <Tab value='2' label='Cозданные' />
        <Tab value='3' label='Отправленные' />
        <Tab value='4' label='Исполненные' />
      </TabList>
      <CardContent>
        <TabPanel value='1'>
          <TableBasic rows={rows} columns={columns} handleClick={handleClick} />
        </TabPanel>

        <TabPanel value='2'>
          <Typography variant='subtitle1'>Нет данных</Typography>
        </TabPanel>

        <TabPanel value='3'>
          <Typography variant='subtitle1'>Нет данных</Typography>
        </TabPanel>

        <TabPanel value='4'>
          <Typography variant='subtitle1'>Нет данных</Typography>
        </TabPanel>
      </CardContent>
    </TabContext>
  )
}

export default DepositTabLists
