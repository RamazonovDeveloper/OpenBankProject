// ** React Imports
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import PaymentsHeader from 'src/views/apps/payments/PaymentsHeader'
import TableFilter from 'src/views/table/data-grid/TableFilter'
import usePayment from 'src/hooks/usePayment'
import useStorage from 'src/hooks/useStorage'
import Icon from 'src/@core/components/icon'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { FormControl, MenuItem, Select, Tab } from '@mui/material'
import MyTable from 'src/views/table/MyTable'
import MyTableFilters from 'src/views/table/MyTableFilters'

// DATE INPUT IMPORTS

// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const columns = [
  { field: 'thisIsVector', headerName: '', minWidth: 20 },
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
  },
  {
    field: 'purpose_code',
    headerName: 'Контрагент',
    minWidth: 340,
    renderCell: params => {
      return (
        <Box>
          <Typography variant='body1' gutterBottom>
            {params.row.doc_account}
          </Typography>
          <Typography variant='body2' gutterBottom>
            {params.row.doc_inn}
          </Typography>
          {params.row.doc_type === 1 && (
            <Typography variant='caption' display='block' gutterBottom>
              Платёж контрагенту
            </Typography>
          )}
          {params.row.doc_type === 2 && (
            <Typography variant='caption' display='block' gutterBottom>
              Платеж казначейству
            </Typography>
          )}
          {params.row.doc_type === 3 && (
            <Typography variant='caption' display='block' gutterBottom>
              Выплата по зарплатному проекту
            </Typography>
          )}
          {params.row.doc_type === 4 && (
            <Typography variant='caption' display='block' gutterBottom>
              Платеж в бюджет
            </Typography>
          )}
        </Box>
      )
    }
  },
  {
    field: 'amount',
    headerName: 'Сумма',
    minWidth: 230,
    renderCell: params => {
      return (
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ mr: 4 }} variant='body2' gutterBottom>
              {params.row.amount}
            </Typography>
            <IconButton color='inherit' sx={{ ml: -2.75 }}>
              <Icon icon='ep:refresh' />
            </IconButton>
          </Box>
        </Box>
      )
    }
  },
  {
    field: 'sender_account',
    headerName: 'Назначение платежа',
    minWidth: 180,
    renderCell: params => {
      return <Box>agrobank</Box>
    }
  },
  {
    field: 'status',
    headerName: 'Статус',
    minWidth: 210,
    renderCell: params => {
      return (
        <Box>
          <Stack direction='row' spacing={1}>
            {(params.row.status === 1 || params.row.status === 2) && (
              <Chip label='Создан' color='warning' variant='outlined' />
            )}
          </Stack>

          {params.row.status === 3 && <Chip label='Отправлен в банк' color='success' variant='outlined' />}
        </Box>
      )
    }
  },

  // {
  //   field: 'payments',
  //   headerName: 'Счёт',
  //   minWidth: 210,
  //   renderCell: params => {
  //     return (
  //       <Box>
  //         <Typography variant='body2' gutterBottom>
  //           {params.row.doc_inn}
  //         </Typography>
  //       </Box>
  //     )
  //   }
  // },
]

const Transactions = () => {

  const [value, setValue] = useState('1');
    
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const router = useRouter()
  const [companyInfo] = useStorage('companyInfo')

  // const companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

  const {
    data,
    getPaymentsList,
    getAccountsList,
    rowItems,
  } = usePayment()
  
  console.log('AAAAAAAAAAAAAAAAAA', rowItems)

  const rows = [...rowItems]

  useEffect(() => {
    getPaymentsList()
    getAccountsList()
  }, [data.account_id, data.type, data.date_from, data.date_till, data.receiver_inn])

  const handleClick = props => {
    
    console.log('AAAAAAAAAAAAAAAAAA', props)

    router.push({
      pathname: `/${companyInfo.slug}/transaction/preview`,
      query: { id: props.id }
    })
  }

  const addItem = e => {
    router.push(`/${companyInfo.slug}/transaction/addItem`)
  }


  // const [age, setAge] = useState('');

  // const handleSelectChange = (event) => {
  //   setAge(event.target.value);
  // };


  return (
    <Grid container spacing={4}>
      {/* <Grid item xs={12}>
        <Typography variant='h5' sx={{color:"#342C2C"}}>
        Транзакции
        </Typography>
      </Grid> */}

      <Grid item xs={12}>
        <Box>
          <TabContext value={value}>
            <Box className="my_tab_list_tabcontext">
              <Card className='my_tab_list_accounts_page'>
                <TabList  className='' onChange={handleChange} aria-label="lab API tabs example" textColor="secondary" indicatorColor="secondary">
                  <Tab className={value == 1 ? 'active_tab tab_item' : "tab_item"} label="Все" value="1" />
                  <Tab className={value == 2 ? 'active_tab tab_item' : "tab_item"} label="Поступления" value="2" />
                  <Tab className={value == 3 ? 'active_tab tab_item' : "tab_item"} label="Списания" value="3" />
                </TabList>
              </Card>
              <Box className="my_tab_list_tabcontext">
                <button onClick={addItem} className='main_btn' style={{textTransform:"unset"}}>
                    Создать платеж <span>+</span>
                </button>
              </Box>
            </Box>

              
            
            <TabPanel className='account_tab_panel' value="1">
              <Box>
                <Typography>14 июня, ср</Typography>
              </Box>
            </TabPanel>
            <TabPanel className='account_tab_panel' value="2">
              <MyTableFilters />
              <MyTable className='account_tab_panel_card' rows={rows} columns={columns} handleClick={handleClick} />
            </TabPanel>
            <TabPanel className='account_tab_panel' value="3">Item Three</TabPanel>
          </TabContext>
        </Box>
      </Grid>

    </Grid>
  )
}

export default Transactions
