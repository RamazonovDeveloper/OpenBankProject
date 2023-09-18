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
import MyTable from 'src/views/table/MyTable'
import TransactionAddTab1Components from 'src/views/apps/transaction/addItem/Tab1Components'
import { useRouter } from 'next/router'

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
  const router = useRouter()

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

  const onTemplateSave = () => {
    router.push({
      pathname: `/transaction/templates`,
      // query: { id: props.id, item: '№ платежного поручения: ' + props.external_id }
    })
  }

  
  const handleClick = props => {
    console.log('AAAAAAAAAAAAAAAAAA', props)

  }

  return (
    <>
      <Grid>
        <Grid item sx={{ width: '100%' }} xs={12}>
          <Box>
            <button onClick={onTemplateSave} className='main_form_btn' style={{marginBottom: "20px", marginLeft: 'auto', marginRight: '0px'}}>
              Сохранить шаблон
              <svg
                style={{ marginLeft: '15px' }}
                width='25'
                height='24'
                viewBox='0 0 25 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M6.64983 0.960022C6.42108 1.00315 6.25608 1.20565 6.25983 1.44002V22.56C6.25795 22.7325 6.34983 22.8919 6.49795 22.9781C6.64608 23.0663 6.82983 23.0663 6.97983 22.98L12.4998 19.755L18.0198 22.98C18.1698 23.0663 18.3536 23.0663 18.5017 22.9781C18.6498 22.8919 18.7417 22.7325 18.7398 22.56V1.44002C18.7398 1.17565 18.5242 0.960022 18.2598 0.960022H6.73983C6.72483 0.960022 6.70983 0.960022 6.69483 0.960022C6.67983 0.960022 6.66483 0.960022 6.64983 0.960022ZM7.21983 1.92002H17.7798V21.72L12.7398 18.78C12.5917 18.6938 12.408 18.6938 12.2598 18.78L7.21983 21.72V1.92002Z'
                  fill='#ffffff'
                />
              </svg>
            </button>
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
