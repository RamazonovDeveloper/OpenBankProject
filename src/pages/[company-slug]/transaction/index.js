// ** React Imports
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import usePayment from 'src/hooks/usePayment'
import useStorage from 'src/hooks/useStorage'
import Icon from 'src/@core/components/icon'
import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import MyTable from 'src/views/table/MyTable'
import MyTableFilters from 'src/views/table/MyTableFilters'
import MyRedesignedTabPanel from 'src/views/components/MyRedesignedTabPanel'
import CircularProgress from '@mui/material/CircularProgress'
import { Pagination } from '@mui/material'

// DATE INPUT IMPORTS

// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const columns = [
  { field: 'type', isFieldTrans: true, headerName: '', minWidth: 20 },
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
  }

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

const paymentTypeOtions = [
  {
    value: 0,
    label: 'Все'
  },
  {
    value: 2,
    label: 'Поступления'
  },
  {
    value: 1,
    label: 'Списания'
  }
]

function accountOptions(data) {
  let options = data.map(option => {
    return {
      ...option,
      value: option.id,
      label: option.account
    }
  })

  options.unshift({ value: 0, label: 'Все платежи' })

  return options
}

const Transactions = () => {
  const {
    dataObj,
    page,
    data,
    type,
    loading,
    setPage,
    getPaymentsList,
    getAccountsList,
    getPaymentsListAsFile,
    rowItems,
    file,
    accountItems,
    setAccount_id,
    setType,
    setDate_from,
    setDate_till,
    setReceiver_inn,
    setExport_type
  } = usePayment()

  const accOptions = accountItems && accountOptions(accountItems)

  const router = useRouter()
  const [currentTabValue, setCurrentTabValue] = useState(1)
  const [companyInfo] = useStorage('companyInfo')

  const rows = [...rowItems]

  console.log('YYYYYYYYYYYYYYYYYYYYYYYYYYYY', rows)

  useEffect(() => {
    getAccountsList()
    getPaymentsListAsFile()
  }, [])

  const handleClick = props => {
    console.log('AAAAAAAAAAAAAAAAAA', props)

    router.push({
      pathname: `/${companyInfo.slug}/transaction/preview`,
      query: { id: props.id }
    })
  }

  // console.log("BBBBBBBBBBBBBBBBBBBBBB", file);

  const addItem = e => {
    router.push(`/${companyInfo.slug}/transaction/addItem`)
  }

  const downloadPDF = data => {
    const linkSource = `data:application/pdf;base64,${data}`
    const downloadLink = document.createElement('a')
    const fileName = 'example.pdf'

    downloadLink.href = linkSource
    downloadLink.download = fileName
    downloadLink.click()
  }

  const downloadFile = () => {
    downloadPDF(file)
  }

  const tabData = (
    <>
      <MyTableFilters
        currentTabValue={currentTabValue}
        accOptions={accOptions}
        kontrOptions={paymentTypeOtions}
        accountItems={accountItems}
        file={file}
        setAccount_id={setAccount_id}
        type={type}
        setType={setType}
        setDate_from={setDate_from}
        setDate_till={setDate_till}
        setReceiver_inn={setReceiver_inn}
        setExport_type={setExport_type}
        downloadFile={downloadFile}
        data={data}
        needToAccounts={false}
      />
      <MyTable
        className='account_tab_panel_card'
        rows={rows}
        columns={columns}
        handleClick={handleClick}
        loading={loading}
      />

      {dataObj && (
        <Box sx={{ width: '100%', pl: '20px', pr: '20px', pb: '20px', display: 'flex', justifyContent: 'end' }}>
          <Pagination
            onChange={(event, page) => setPage(page)}
            count={dataObj.last_page}
            page={dataObj.current_page}
            variant='outlined'
            shape='rounded'
            size='large'
          />
        </Box>
      )}
    </>
  )

  const tabProps = {
    defaultIndex: type,
    tabNames: [{ 0: 'Все' }, { 2: 'Поступления' }, { 1: 'Списания' }],
    tabItems: [
      {
        0: tabData
      },
      {
        1: tabData
      },
      {
        2: tabData
      }
    ]
  }

  const buttonProps = (
    <>
      <button onClick={() => router.push(`/${companyInfo.slug}/transaction/addItem`)} className='main_btn'>
        Создать платеж{' '}
        <span>
          <svg width='17' height='16' viewBox='0 0 17 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M8.01982 0.320007V7.52001H0.819824V8.48001H8.01982V15.68H8.97982V8.48001H16.1798V7.52001H8.97982V0.320007H8.01982Z'
              fill='white'
            />
          </svg>
        </span>
      </button>
    </>
  )

  return (
    <Grid container spacing={4}>
      {/* <Grid item xs={12}>
        <Typography variant='h5' sx={{color:"#342C2C"}}>
        Транзакции
        </Typography>
      </Grid> */}

      {/* <button onClick={downloadFile}>Meni bosib ko'r</button> */}

      {/* <ExcelExport file={file}/> */}

      <Grid item xs={12}>
        <MyRedesignedTabPanel type={type} setType={setType} tabProps={tabProps} buttonProps={buttonProps} />
        {/* <Box>
          <TabContext value={value}>
            <Box className="my_tab_list_tabcontext">
              <Card className='my_tab_list_accounts_page'>
                <TabList  className='' onChange={handleChange} aria-label="lab API tabs example" textColor="secondary" indicatorColor="secondary" TabIndicatorProps={{style: {background:'transparent'}}}>
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
              <MyTableFilters
                accOptions={accOptions}                 
                kontrOptions={paymentTypeOtions}
                accountItems={accountItems}
                setAccount_id={setAccount_id}
                setType={setType}
                setDate_from={setDate_from}
                setDate_till={setDate_till}
                setReceiver_inn={setReceiver_inn}
                data={data}
              />
              <MyTable className='account_tab_panel_card' rows={rows} columns={columns} handleClick={handleClick} />
            </TabPanel>
            <TabPanel className='account_tab_panel' value="3">Item Three</TabPanel>
          </TabContext>
        </Box> */}
      </Grid>
    </Grid>
  )
}

export default Transactions
