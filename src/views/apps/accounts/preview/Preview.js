// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'

// ** Third Party Components
import axios from 'axios'

// ** Demo Components Imports
import PreviewCard from 'src/views/apps/accounts/preview/PreviewCard'
import PreviewActions from 'src/views/apps/accounts/preview/PreviewActions'
import PreviewHeader from './PreviewHeader'
import { Box, Card, Tab, Typography } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import TableBasic from 'src/views/table/TableBasic'

import useAccount from 'src/hooks/useAccount'

let columns = [
  {
    flex: 0.1,
    field: 'id',
    headerName: 'Счёт',
    align: 'left',
    minWidth: 200
  },
  {
    flex: 0.1,
    field: 'account_number',
    headerName: 'Счёт',
    align: 'left',
    minWidth: 200
  },
  {
    flex: 0.1,
    field: 'sum_residue',
    headerName: 'Остаток',
    align: 'left',
    minWidth: 170
  },
  {
    flex: 0.1,
    field: 'type',
    headerName: 'Тип',
    align: 'left',
    minWidth: 170
  },
  {
    flex: 0.1,
    field: 'status',
    headerName: 'Состояние',
    align: 'left',
    minWidth: 170
  },
  {
    flex: 0.1,
    field: 'bank',
    headerName: 'Банк',
    align: 'left',
    minWidth: 170
  }
]

let rows = [
  {
    id: '1',
    account_number: 23120000002560000257,
    sum_residue: '4 200 422,00 UZS',
    status: 'Открыт',
    type: 'Расчётный',
    bank: 'Agrobank'
  },
  {
    id: 2,
    account_number: 23120000004190000143,
    sum_residue: '2 500 000,00 UZS',
    status: 'Открыт',
    type: 'Расчётный',
    bank: 'AsakaBank'
  },
  {
    id: 3,
    account_number: 23120000009630000631,
    sum_residue: '45 678,00 USD',
    status: 'Открыт',
    type: 'Расчётный',
    bank: 'KapitalBank'
  },
  {
    id: 4,
    account_number: 23120000002560000257,
    sum_residue: '2 885 036,00 UZS',
    status: 'Открыт',
    type: 'Расчётный',
    bank: 'Agrobank'
  }
]

const InvoicePreview = ({ id }) => {
  // ** State
  const [error, setError] = useState(false)
  const [data, setData] = useState(null)
  const [addPaymentOpen, setAddPaymentOpen] = useState(false)
  const [sendInvoiceOpen, setSendInvoiceOpen] = useState(false)

  // useEffect(() => {
  //   axios
  //     .get('/apps/invoice/single-invoice', { params: { id } })
  //     .then(res => {
  //       setData(res.data)
  //       setError(false)
  //     })
  //     .catch(() => {
  //       setData(null)
  //       setError(true)
  //     })
  // }, [id])
  const toggleSendInvoiceDrawer = () => setSendInvoiceOpen(!sendInvoiceOpen)
  const toggleAddPaymentDrawer = () => setAddPaymentOpen(!addPaymentOpen)

  // const { getAccountsList, getAccountsById, loadingSingleAsync, accountSync, accountItems, sum, accountsSync, loadingAsync } =
  // useEffect(() => {
  //   getAccountsList()
  //   getAccountsById()

  //   console.log();
  // }, [])

  const [value, setValue] = useState('2')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleClick = () => {
    console.log('salom')
  }

  if (data == null) {
    return (
      <>
        <Grid>
          <PreviewHeader />
        </Grid>
        <Grid container spacing={6}>
          <Grid item sx={{ mt: '20px' }} xs={12}>
            <PreviewCard />
          </Grid>
        </Grid>

        <Grid sx={{ mt: '20px' }}>
          <Box>
            <TabContext value={value}>
              <Box className='my_tab_list_tabcontext'>
                <Card className='my_tab_list_accounts_page'>
                  <TabList
                    className=''
                    onChange={handleChange}
                    aria-label='lab API tabs example'
                    textColor='secondary'
                    indicatorColor='secondary'
                  >
                    <Tab label='Все' value='1' />
                    <Tab label='Поступления' value='2' />
                    <Tab label='Списания' value='3' />
                  </TabList>
                </Card>
                <Box className='my_tab_list_tabcontext'>
                  <button className='main_btn'>
                    Добавить счет <span>+</span>
                  </button>
                </Box>
              </Box>

              <TabPanel className='account_tab_panel' value='1'>
                <Box>
                  <Typography>14 июня, ср</Typography>
                </Box>
              </TabPanel>
              <TabPanel className='account_tab_panel' value='2'>
                <TableBasic
                  className='account_tab_panel_card'
                  rows={rows}
                  columns={columns}
                  handleClick={handleClick}
                />
              </TabPanel>
              <TabPanel className='account_tab_panel' value='3'>
                Item Three
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>

        {/* <Grid item xl={3} md={4} xs={12}>
            <PreviewActions id={id} />
          </Grid> */}
      </>
    )
  } else if (error) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Alert severity='error'>
            Счет с идентификатором: {id} не существует. Пожалуйста, проверьте список счетов-фактур:{' '}
            <Link href='/apps/invoice/list'>Список счетов</Link>
          </Alert>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default InvoicePreview
