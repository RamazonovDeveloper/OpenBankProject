// ** Demo Components Imports
import { useEffect, useState } from 'react'
import Preview from 'src/views/apps/payments/preview/Preview'
import { useCompany } from 'src/hooks/useCompany'
import PaymentRepository, { baseUrl } from 'src/repositories/PaymentRepository'
import usePayment from 'src/hooks/usePayment'
import useEimzo from 'src/hooks/useEimzo'
import EIMZO from 'src/lib/Eimzo'
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import useDocumentsFilter from 'src/hooks/useDocuments'

const InsuranceContractsOfDocuments = ({ props }) => {
  const { documentsList, pdfFiles, singleDocument, getDocumentsByItsId, getDocumentsByItsIdPDFFiles } =
    useDocumentsFilter()

  //   const { props } = props

  useEffect(() => {
    getDocumentsByItsId(props)
    getDocumentsByItsIdPDFFiles(props)
  }, [])

  //   console.log("17 17 17 17 17 Document id id id id inside of the Document by id js", props);

  //   console.log("17 17 17 17 17 Document id inside of the Document by id js", paymentId);

  //   console.log("17 17 17 17 17 SINGLE DOCUMENT Document id inside of the Document by id js", singleDocument);

  //   console.log("17 17 17 17 17 SINGLE DOCUMENT Document PDF FILES id inside of the Document by id js", pdfFiles);

  const signers = singleDocument.signers || [{ name: 'Bank' }, { name: 'Bank' }]

  console.log(signers)

  return props ? (
    <>
      <Grid>
        {/* <Typography variant='h5' sx={{mb:"20px", color:"#342C2C"}}>Детали транзакции #9119id{data.id}</Typography> */}
        <Card sx={{ minHeight: '80vh', boxShadow: 'none' }}>
          <CardContent>
            <Grid container sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <Box>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: '20px'
                  }}
                >
                  <Typography variant={'body'}>Дата создания документа</Typography>
                  <Typography sx={{ color: '#342C2C' }} variant={'body'}>
                    {singleDocument.updated_at}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: '20px'
                  }}
                >
                  <Typography variant={'body'}>Платежное поручение</Typography>
                  <Typography sx={{ color: '#342C2C' }} variant={'body'}>
                    {singleDocument.number}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: '20px'
                  }}
                >
                  <Typography variant={'body'}>Дата платежа</Typography>
                  <Typography sx={{ color: '#342C2C' }} variant={'body'}>
                    {singleDocument.date}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: '20px'
                  }}
                >
                  <Typography variant={'body'}>Сумма платежа:</Typography>
                  <Typography sx={{ color: '#342C2C' }} variant={'body'}>
                    {'data.amount'} UZS
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: '20px'
                  }}
                >
                  <Typography variant={'body'}>Код назначения</Typography>
                  <Typography sx={{ color: '#342C2C' }} variant={'body'}>
                    {singleDocument.uuid_code}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: '20px'
                  }}
                >
                  <Typography variant={'body'}>Назначение платежа</Typography>
                  <Typography sx={{ color: '#342C2C' }} variant={'body'}>
                    Оплата услуг по договору №18 от 23.06.2023 г.{' '}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Box sx={{ width: 'fit-content', marginLeft: 'auto', marginRight: '0px', display: 'flex' }}>
                  <Box sx={{ textAlign: 'center' }}>
                    {/* <Typography sx={{ marginBottom: '8px' }}>Отправить на печать</Typography> */}
                    {/* <button className='main_btn' style={{ textTransform: 'capitalize' }}>
                      Печать{' '}
                      <span>
                        <img src='/images/transaction/printIcon.png' />
                      </span>
                    </button> */}
                    <Typography sx={{ marginBottom: '8px', fontSize: '15px' }}>Отправить на печать</Typography>
                    <a
                      href=''
                      onClick={event => {
                        event.preventDefault()
                        window.open(singleDocument.link, 'PRINT', 'height=auto,width=auto')
                      }}
                      className='main_btn'
                      style={{ textTransform: 'capitalize', textDecoration: 'none' }}
                    >
                      Печать{' '}
                      <span>
                        <img src='/images/transaction/printIcon.png' />
                      </span>
                    </a>
                  </Box>
                  <Box sx={{ marginLeft: '35px' }}>
                    <Typography sx={{ marginBottom: '8px' }}>Сохранить информацию</Typography>
                    <Box sx={{ display: 'flex' }}>
                      <a
                        href={singleDocument.link}
                        target='_blank'
                        className='main_btn'
                        style={{ textTransform: 'capitalize', textDecoration: 'none' }}
                        rel='noreferrer'
                      >
                        PDF{' '}
                        <span>
                          <img src='/images/transaction/downloadIcon.png' />
                        </span>
                      </a>
                      {/* <button className='main_btn' style={{ textTransform: 'capitalize' }}>
                        PDF{' '}
                        <span>
                          <img src='/images/transaction/downloadIcon.png' />
                        </span>
                      </button> */}
                      <a
                        href={singleDocument.link}
                        target='_blank'
                        className='main_btn'
                        style={{ textTransform: 'capitalize', textDecoration: 'none', marginLeft: 10 }}
                        rel='noreferrer'
                      >
                        Excel{' '}
                        <span>
                          <img src='/images/transaction/downloadIcon.png' />
                        </span>
                      </a>
                      {/* <button className='main_btn' style={{ textTransform: 'capitalize', marginLeft: '20px' }}>
                        Excel{' '}
                        <span>
                          <img src='/images/transaction/downloadIcon.png' />
                        </span>
                      </button> */}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <Box>
                <Typography sx={{ color: '#342C2C', fontWeight: '500', fontSize: '20px', mb: '10px' }}>
                  Плательщик
                </Typography>
                <Card sx={{ boxShadow: 'none', backgroundColor: '#EEEEEE' }}>
                  <CardContent>
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        justifyContent: 'space-between',
                        mb: '20px'
                      }}
                    >
                      <Typography variant={'body'}>Наименование организации </Typography>
                      <Typography sx={{ color: '#342C2C' }} variant={'body'}>
                        {signers[0]?.company_name || ''}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: '20px'
                      }}
                    >
                      <Typography variant={'body'}>МФО банка</Typography>
                      <Typography sx={{ color: '#342C2C' }} variant={'body'}>
                        {signers[0]?.tin}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: '20px'
                      }}
                    >
                      <Typography variant={'body'}>Банк</Typography>
                      <Typography sx={{ color: '#342C2C' }} variant={'body'}>
                        {singleDocument?.sender}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: '20px'
                      }}
                    >
                      <Typography variant={'body'}>Расчетный счет</Typography>
                      <Typography sx={{ color: '#342C2C' }} variant={'body'}>
                        {signers[0]?.pinfl}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: '20px'
                      }}
                    >
                      <Typography variant={'body'}>ИНН</Typography>
                      <Typography sx={{ color: '#342C2C' }} variant={'body'}>
                        {signers[0] && '10 000 000,00 UZS'}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
              <Box>
                <Typography sx={{ color: '#342C2C', fontWeight: '500', fontSize: '20px', mb: '10px' }}>
                  Получатель
                </Typography>
                <Card sx={{ boxShadow: 'none', backgroundColor: '#EEEEEE' }}>
                  <CardContent>
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: '20px'
                      }}
                    >
                      <Typography variant={'body'}>Наименование организации </Typography>
                      <Typography sx={{ color: '#342C2C' }} variant={'body'}>
                        {signers[1]?.name && 'не получено'}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: '20px'
                      }}
                    >
                      <Typography variant={'body'}>МФО банка</Typography>
                      <Typography sx={{ color: '#342C2C' }} variant={'body'}>
                        {signers[0]?.data && data.sender_mfo}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: '20px'
                      }}
                    >
                      <Typography variant={'body'}>Банк</Typography>
                      <Typography sx={{ color: '#342C2C' }} variant={'body'}>
                        {singleDocument?.sender}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: '20px'
                      }}
                    >
                      <Typography variant={'body'}>Расчетный счет</Typography>
                      <Typography sx={{ color: '#342C2C' }} variant={'body'}>
                        {signers[0]?.pinfl}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: '20px'
                      }}
                    >
                      <Typography variant={'body'}>ИНН</Typography>
                      <Typography sx={{ color: '#342C2C' }} variant={'body'}>
                        {signers[0] && '10 000 000,00 UZS'}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
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

export default InsuranceContractsOfDocuments

// console.log("CCCCCCCCC documentPreview PROPS", props);

//   const [value, setValue] = useState('1');

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//     return
//     <Grid>
//     <Box>
//       <TabContext value={value}>
//         <Box className="my_tab_list_tabcontext">
//           <Card className='my_tab_list_accounts_page'>
//             <TabList  className='my_tab_list_accounts_page_list' onChange={handleChange} aria-label="lab API tabs example" textColor="secondary" indicatorColor="secondary">
//               <Tab className={value == 1 ? 'active_tab tab_item' : "tab_item"} label="Кредитные документы" value="1" />
//               <Tab className={value == 2 ? 'active_tab tab_item' : 'tab_item'} label="Договоры страхования" value="2" />
//               <Tab className={value == 3 ? 'active_tab tab_item' : "tab_item"} label="Платежные документы" value="3" />
//             </TabList>
//           </Card>
//         </Box>

//         <TabPanel className='account_tab_panel' value="1">

//         </TabPanel>
//         <TabPanel className='account_tab_panel' value="2">

//         </TabPanel>
//         <TabPanel className='account_tab_panel' value="3">

//         </TabPanel>
//       </TabContext>
//     </Box>
// </Grid>
