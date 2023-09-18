import { useEffect, useState } from 'react'

// import Preview from 'src/views/apps/payments/preview/Preview'
// import { useCompany } from 'src/hooks/useCompany'
// import PaymentRepository, { baseUrl } from 'src/repositories/PaymentRepository'
// import usePayment from 'src/hooks/usePayment'
// import useEimzo from 'src/hooks/useEimzo'
// import EIMZO from 'src/lib/Eimzo'
import Box from '@mui/material/Box'

// import { useRouter } from 'next/router'
import { Card, CardContent, FormControl, Grid, MenuItem, Select, Tab, Tabs, Typography } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import MyTable from 'src/views/table/MyTable'
import TransactionAddTab1Components from 'src/views/apps/transaction/addItem/Tab1Components'

// import MyTable from 'src/views/table/MyTable'

const columns = [
  { field: 'thisIsVector', headerName: 'Название шаблона', minWidth: 20 },
  { field: 'thisIsVector', headerName: 'Контрагент', minWidth: 20 },
  { field: 'thisIsVector', headerName: 'Сумма', minWidth: 20 },
  { field: 'thisIsVector', headerName: 'Назначение платежа', minWidth: 20 },
  {
    field: 'sent_date',
    headerName: 'Дата',
    minWidth: 140,
    renderCell: params => {
      return (
        <Box>
          <Typography variant='body2' gutterBottom>
            {params.row.sent_date.slice(0, 10)}
          </Typography>
        </Box>
      )
    }
  }
]

const InvoiceAddItem = () => {
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const [age, setAge] = useState('')

  const handleSelectChange = event => {
    setAge(event.target.value)
  }

  const [secondValue, setSecondValue] = useState('1')

  const handleSecondChange = (event, newValue) => {
    setSecondValue(newValue)
  }

  return (
    <>
      <Grid>
        <Grid item sx={{ width: '100%' }} xs={12}>
          <Box>
            <TransactionAddTab1Components />
            {/* <TabContext value={value}>
              <Box className='my_tab_list_tabcontext'>
                <Card className='my_tab_list_accounts_page'>
                  <TabList
                    className=''
                    onChange={handleChange}
                    aria-label='lab API tabs example'
                    textColor='secondary'
                    indicatorColor='transparent'
                  >
                    <Tab
                      className={value == 1 ? 'active_tab tab_item' : 'tab_item'}
                      label='Платеж контрагенту'
                      value='1'
                    />
                    <Tab
                      className={value == 2 ? 'active_tab tab_item' : 'tab_item'}
                      label='Платеж казначейству'
                      value='2'
                    />
                    <Tab className={value == 3 ? 'active_tab tab_item' : 'tab_item'} label='Шаблоны' value='3' />
                  </TabList>
                </Card>
              </Box>

              <TabPanel className='transaction_tab_panel' value='1'>
                <TransactionAddTab1Components docType={2} />
              </TabPanel>

              <TabPanel className='transaction_tab_panel' value='2'>
                <TransactionAddTab1Components docType={1} />
              </TabPanel>

              <TabPanel className='account_tab_panel' value='3'>
                <Box sx={{ padding: '20px' }}>
                  <Box
                    className='myInput'
                    sx={{ display: 'flex', justifyContent: 'space-between', height: '55px', width: '30%' }}
                  >
                    <input
                      type='text'
                      className=''
                      style={{ border: 'none', background: 'transparent', padding: '0px' }}
                      placeholder='Поиск шаблона'
                    />
                    <img src='/images/Vector.png' alt='' />
                  </Box>
                </Box>
              </TabPanel>
            </TabContext> */}
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default InvoiceAddItem
