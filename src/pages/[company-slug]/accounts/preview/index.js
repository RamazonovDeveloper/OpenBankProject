// ** Demo Components Imports
import { useEffect, useState } from 'react'
import usePayment from 'src/hooks/usePayment'
import Box from '@mui/material/Box'
import { Card, Chip, Grid, Icon, IconButton, Pagination, Stack, Tab, Typography } from '@mui/material'
import PreviewCard from 'src/views/apps/accounts/preview/PreviewCard'
import AccountRepository from 'src/repositories/AccountRepository'
import MyTable from 'src/views/table/MyTable'
import MyRedesignedTabPanel from 'src/views/components/MyRedesignedTabPanel'
import MyTableFilters from 'src/views/table/MyTableFilters'
import { useRouter } from 'next/router'

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

const InvoicePreview = ({ paymentId }) => {
  const [accountData, setAccountData] = useState(null)
  const [currentTabValue, setCurrentTabValue] = useState(1)
  const router = useRouter()

  let companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

  async function getAccountByGivenId() {
    let res = await AccountRepository.getAccountById(paymentId)
    res && console.log('ACCOUNTS PREVIEW .....', res)
    res && setAccountData(res)
  }

  useEffect(() => {
    getAccountByGivenId()
  }, [])

  const {
    dataObj,
    data,
    type,
    loading,
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

  useEffect(() => {
    setAccount_id(paymentId)
  }, [])

  const rows = [...rowItems]

  console.log('ACCOUNTS PREVIEW INDEX ID  .....', paymentId)
  console.log('ACCOUNT PREVIEW ROW ITEMS IS ....', rows)

  // console.log("Payment id inside of the payment by id js", paymentId);

  // const router = useRouter()
  // const [data, setData] = useState(null)
  // const [isPaymentSent, setIsPaymentSent] = useState(false)
  // const { confirmPayment } = usePayment()
  // const EIMZOClient = new EIMZO()
  // const [certificates, setCertificates] = useState([])
  // const { loadKey, createPkcs7, append_pkcs7_attached } = useEimzo()

  // useEffect(() => {
  //   const listAllKeys = async () => {
  //     const certs = await EIMZOClient.install()
  //     const data = await EIMZOClient.listAllUserKeys()
  //     console.log(data)
  //     setCertificates(data)
  //   }
  //   listAllKeys()
  // }, [])

  // async function getInfo(params) {
  //   let res = await PaymentRepository.getPaymentById(paymentId)
  //   res && setData(res.data)
  // }

  // async function confirmPaymentHandle() {
  //   setIsPaymentSent(true)
  //   let companyInfo = JSON.parse(localStorage.getItem('companyInfo'))
  //   if (companyInfo) {
  //     let companyInn = companyInfo.inn

  //     let itm = certificates.filter(item => {
  //       return item.TIN == companyInn
  //     })[0]

  //     console.log('itm', itm)

  //     if (itm) {
  //       const key = await loadKey(itm)
  //       console.log('key itm', key)

  //       const hash = await createPkcs7(key)

  //       const params = {
  //         hash: hash,
  //         id: data.id
  //       }

  //       let payment = await confirmPayment(params)
  //       console.log('payment', payment)
  //       if (payment.message) {
  //         setIsPaymentSent(false)
  //         alert(payment.message)
  //         router.push(`/${companyInfo.slug}/payments`)
  //       }
  //     }
  //   }
  // }

  // useEffect(() => {
  //   getInfo()
  // }, [])

  const paymentTypeOtions = [
    {
      value: 0,
      label: 'Все'
    },
    {
      value: 1,
      label: 'Поступления'
    },
    {
      value: 2,
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

  const handleClick = props => {
    console.log('AAAAAAAAAAAAAAAAAA', props)

    router.push({
      pathname: `/${companyInfo.slug}/transaction/preview`,
      query: { id: props.id }
    })
  }

  const tabData = (
    <>
      <MyTableFilters
        currentTabValue={currentTabValue}
        kontrOptions={paymentTypeOtions}
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
    tabNames: [
      { 0: 'Все' }

      // , { 2: 'Суммовы' }, { 3: 'Долларовые' }
    ],
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
      <Box className='my_tab_list_tabcontext'>
        <button className='main_btn'>
          Добавить счет{' '}
          <span>
            <svg width='17' height='16' viewBox='0 0 17 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M8.01982 0.320007V7.52001H0.819824V8.48001H8.01982V15.68H8.97982V8.48001H16.1798V7.52001H8.97982V0.320007H8.01982Z'
                fill='white'
              />
            </svg>
          </span>
        </button>
      </Box>
    </>
  )

  const [value, setValue] = useState('2')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return paymentId ? (
    <>
      <Grid container spacing={6}>
        <Grid item sx={{ mt: '20px' }} xs={12}>
          {accountData && <PreviewCard data={accountData} paymentId={paymentId} />}
        </Grid>
      </Grid>

      <Grid sx={{ mt: '20px' }}>
        <MyRedesignedTabPanel type={type} setType={setType} tabProps={tabProps} buttonProps={buttonProps} />
        {/* <Box>
              <TabContext className={'myTabXontext'} value={value}>
                <Box className="my_tab_list_tabcontext">
                  <Card className='my_tab_list_accounts_page'>
                    <TabList  className='' onChange={handleChange} aria-label="lab API tabs example" textColor="secondary" indicatorColor="secondary">
                      <Tab className={value == 1 ? 'active_tab tab_item' : "tab_item"} label="Все" value="1" />
                      <Tab className={value == 2 ? 'active_tab tab_item' : "tab_item"} label="Поступления" value="2" />
                      <Tab className={value == 3 ? 'active_tab tab_item' : "tab_item"} label="Списания" value="3" />
                    </TabList>
                  </Card>
                  <Box className="my_tab_list_tabcontext">
                    <button className='main_btn'>
                      Добавить счет <span>+</span>
                    </button> 
                  </Box>
                </Box>

                  
                
                <TabPanel  className='account_tab_panel' value="1">
                  <Box>
                    <Typography>14 июня, ср</Typography>
                  </Box>
                </TabPanel>
                <TabPanel className='account_tab_panel' value="2">
                  <Box sx={{p:'20px', display:'flex', justifyContent:"space-between"}}>
                    <Box sx={{display:"flex", gap:"20px"}}>
                      <Box>
                        <Typography sx={{mb:'8px'}}>
                          Дата начала
                        </Typography>
                        <input className='myInput' type='date'/>
                      </Box>
                      <Box>
                        <Typography sx={{mb:'8px'}}>
                        Дата окончания
                        </Typography>
                        <input className='myInput' type='date'/>
                      </Box>
                      <Box>
                        <Typography sx={{mb:'8px'}}>
                        Валюта
                        </Typography>
                        <select className='myInput' name="" id="">
                          <option value="all">Все</option>
                        </select>
                      </Box>
                      <Box>
                        <Typography sx={{mb:'8px'}}>
                          Счет
                        </Typography>
                        <select className='myInput' name="" id="">
                          <option value="all">Все</option>
                        </select>
                      </Box>
                      <Box>
                        <Typography sx={{mb:'8px'}}>
                          Контрагент
                        </Typography>
                        <select className='myInput' style={{width:"160px"}} name="" id="">
                          <option value="all">Все</option>
                        </select>
                      </Box>
                    </Box>
                    <Box >
                      <Typography sx={{mb:"8px"}}>
                        Получить  выписку
                      </Typography>
                      <Box sx={{display:"flex"}}>
                        <button className='main_btn' style={{textTransform:"capitalize"}}>
                        PDF <span><img src='/images/transaction/downloadIcon.png'/></span>
                        </button>
                        <button className='main_btn' style={{textTransform:"capitalize", marginLeft:"20px"}}>
                        Excel <span><img src='/images/transaction/downloadIcon.png'/></span>
                        </button>
                      </Box>
                    </Box>
                  </Box>
                  <MyTable columns={columns} rows={rows} handleClick={() => console.log("scheta item clikked")}/>
                </TabPanel>
                <TabPanel className='account_tab_panel' value="3">Item Three</TabPanel>
              </TabContext>
            </Box> */}
      </Grid>

      {/* <Grid item xl={3} md={4} xs={12}>
            <PreviewActions id={id} />
          </Grid> */}
    </>
  ) : (
    <Box>Загрузка..</Box>
  )
}

export async function getServerSideProps(context) {
  const paymentId = context.query.id

  // const {company, token} = useCompany()
  // let data = await PaymentRepository.getPaymentById(paymentId)

  return {
    props: {
      paymentId: context.query.id

      // paymentData: data
    } // will be passed to the page component as props
  }
}

export default InvoicePreview
