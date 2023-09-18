import React from 'react'
import TabContext from '@mui/lab/TabContext'
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import TabList from '@mui/lab/TabList'
import TransactionTabPanelComponent from './TransactionTabPanelComponent'
import { Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { getFirstDayOfMonth, getFirstDayOfWeek, getLastDayOfCurrentWeek, getLastDayOfMonth } from 'src/utils/common'
import TransactionAddItemTabPanelComponent from './TransactionAddItemTabPanelComponent'

export default function TransactionAddItemTabContext(props) {
  const [value, setValue] = useState('1')
  const { rowItems, setDate_from, setDate_till, setPerPage } = props

  useEffect(() => {
    let currentDate = new Date().toJSON().slice(0, 10)
    setDate_from(currentDate)
  }, [])

  const handleChange = (event, newValue) => {
    if (newValue == 1) {
      let currentDate = new Date().toJSON().slice(0, 10)
      setDate_from(currentDate)
    }
    if (newValue == 2) {
      let firstDay = getFirstDayOfWeek()

      let lastDay = getLastDayOfCurrentWeek(firstDay)

      setDate_from(firstDay)
      setDate_till(lastDay)
    }
    if (newValue == 3) {
      const date = new Date()

      const firstDay = getFirstDayOfMonth(date.getFullYear(), date.getMonth())

      const lastDayCurrentMonth = getLastDayOfMonth(date.getFullYear(), date.getMonth())

      setDate_from(firstDay)
      setDate_till(lastDayCurrentMonth)
      setPerPage(null)
    }
    setValue(newValue)
  }

  const TransTabPanelItem = () => {
    return (
      <Box
        sx={{
          //   height: '627px',
          width: '100%'

          //   overflowY: 'scroll'
        }}
      >
        {rowItems.length > 0 ? (
          <TransactionAddItemTabPanelComponent rowItems={rowItems} />
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '627px'
            }}
          >
            <Typography>Нет данных</Typography>
          </Box>
        )}
      </Box>
    )
  }

  return (
    <TabContext value={value}>
      <Box className='tabHeader'>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '22px',
            fontWeight: '600',
            color: '#342C2C'
          }}
        >
          Транзакции
        </Box>
        <TabList
          className='my_tab_list'
          onChange={handleChange}
          aria-label='lab API tabs example'
          textColor='secondary'
          indicatorColor='secondary'
          TabIndicatorProps={{ style: { background: '#4E0F8A', bottom: 8 } }}
        >
          <Tab label='Сегодня' value='1' />
          <Tab label='Неделя' value='2' />
          <Tab label='Месяц' value='3' />
        </TabList>
      </Box>
      <TabPanel sx={{ p: 0, pr: '10px', pt: '10px' }} value='1'>
        <TransTabPanelItem />
      </TabPanel>
      <TabPanel value='2'>
        <TransTabPanelItem />
      </TabPanel>
      <TabPanel value='3'>
        <TransTabPanelItem />
      </TabPanel>
    </TabContext>
  )
}
