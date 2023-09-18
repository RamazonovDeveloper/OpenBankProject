import * as React from 'react'
import Box from '@mui/material/Box'

// ** React Imports
import { forwardRef, useStatem, useEffect, useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Divider from '@mui/material/Divider'
import TabContext from '@mui/lab/TabContext'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import TableBasic from 'src/views/table/data-grid/TableBasic'
import useKartoteka from 'src/hooks/useKartoteka'

const columns = [
  {
    flex: 0.1,
    field: 'sent_date',
    headerName: 'Дата',
    align: 'left',
    minWidth: 100
  },
  {
    flex: 0.1,
    field: 'type',
    headerName: 'Тип задолженности',
    align: 'left',
    minWidth: 170
  },
  {
    flex: 0.1,
    field: 'receiver_account',
    headerName: 'Контрагент',
    align: 'left',
    minWidth: 170
  },
  {
    flex: 0.1,
    field: 'state',
    headerName: 'Пеня',
    align: 'left',
    minWidth: 100
  },
  {
    flex: 0.1,
    field: 'amount',
    headerName: 'Сумма задолженности',
    align: 'left',
    minWidth: 100
  },
  {
    flex: 0.1,
    field: 'status',
    headerName: 'Статус',
    align: 'left',
    minWidth: 170
  }
]

const Kartoteka = () => {
  const [value, setValue] = useState('1')

  const { getAccountsList, kartotekaList } = useKartoteka()

  useEffect(() => {
    getAccountsList()
  }, [])

  const handleTabsChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Grid container spacing={4}>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant='h5' sx={{ mr: 1.75 }}>
          Картотека
        </Typography>
      </Box>
      <Box sx={{ width: '100%', mt: 5 }}>
        <TabContext value={value}>
          <TabList
            variant='scrollable'
            scrollButtons={false}
            onChange={handleTabsChange}
            sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
          >
            <Tab value='1' label='Bce' />
          </TabList>
          <CardContent>
            <TabPanel sx={{ p: 0 }} value='1'>
              <TableBasic rows={kartotekaList} columns={columns} />
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
          <Divider sx={{ m: '0 !important' }} />
        </TabContext>
      </Box>
    </Grid>
  )
}

export default Kartoteka
