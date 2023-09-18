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

const InvoicePreview = ({ paymentId }) => {

  console.log("Payment id inside of the payment by id js", paymentId);

  const router = useRouter()
  const [data, setData] = useState(null)
  const [isPaymentSent, setIsPaymentSent] = useState(false)
  const { confirmPayment } = usePayment()
  const EIMZOClient = new EIMZO()
  const [certificates, setCertificates] = useState([])
  const { loadKey, createPkcs7, append_pkcs7_attached } = useEimzo()

  useEffect(() => {
    const listAllKeys = async () => {
      const certs = await EIMZOClient.install()
      const data = await EIMZOClient.listAllUserKeys()
      console.log(data)
      setCertificates(data)
    }
    listAllKeys()
  }, [])

  async function getInfo(params) {
    let res = await PaymentRepository.getPaymentById(paymentId)
    res && setData(res.data)
  }

  async function confirmPaymentHandle() {
    setIsPaymentSent(true)
    let companyInfo = JSON.parse(localStorage.getItem('companyInfo'))
    if (companyInfo) {
      let companyInn = companyInfo.inn

      let itm = certificates.filter(item => {
        return item.TIN == companyInn
      })[0]

      console.log('itm', itm)

      if (itm) {
        const key = await loadKey(itm)
        console.log('key itm', key)

        const hash = await createPkcs7(key)

        const params = {
          hash: hash,
          id: data.id
        }

        let payment = await confirmPayment(params)
        console.log('payment', payment)
        if (payment.message) {
          setIsPaymentSent(false)
          alert(payment.message)
          router.push(`/${companyInfo.slug}/payments`)
        }
      }
    }
  }

  useEffect(() => {
    getInfo()
  }, [])

  return data ? (
    <>
        <Grid>
            {/* <Typography variant='h5' sx={{mb:"20px", color:"#342C2C"}}>Детали транзакции #9119id{data.id}</Typography> */}
            <Card sx={{minHeight:"80vh", boxShadow:"none"}}>
                <CardContent>
                    <Grid container sx={{display:'grid', gridTemplateColumns:"1fr 1fr", gap:"20px"}}>
                        <Box>
                            <Box sx={{display:'grid', gridTemplateColumns:"1fr 1fr", justifyContent:'space-between', alignItems:'center', mb:'20px'}}>
                                <Typography variant={'body'}>Дата </Typography>
                                <Typography sx={{color:"#342C2C"}} variant={'body'}>{data.sent_date}</Typography>
                            </Box>
                            <Box sx={{display:'grid', gridTemplateColumns:"1fr 1fr", justifyContent:'space-between', alignItems:'center', mb:'20px'}}>
                                <Typography variant={'body'}>№ платежного поручения</Typography>
                                <Typography sx={{color:"#342C2C"}} variant={'body'}>123456789</Typography>
                            </Box>
                            <Box sx={{display:'grid', gridTemplateColumns:"1fr 1fr", justifyContent:'space-between', alignItems:'center', mb:'20px'}}>
                                <Typography variant={'body'}>Сумма платежа:</Typography>
                                <Typography sx={{color:"#342C2C"}} variant={'body'}>{data.amount} UZS</Typography>
                            </Box>
                            <Box sx={{display:'grid', gridTemplateColumns:"1fr 1fr", justifyContent:'space-between', alignItems:'center', mb:'20px'}}>
                                <Typography variant={'body'}>Назначение платежа</Typography>
                                <Typography sx={{color:"#342C2C"}} variant={'body'}>Оплата услуг по договору №18 от 23.06.2023 г. </Typography>
                            </Box>
                            <Box sx={{display:'grid', gridTemplateColumns:"1fr 1fr", justifyContent:'space-between', alignItems:'center', mb:'20px'}}>
                                <Typography variant={'body'}>Статус</Typography>
                                <Typography sx={{color:"#342C2C"}} variant={'body'}><span style={{display:'inline-block', width:"10px", height:'10px', backgroundColor:"#4E0F8A", borderRadius:'50%'}}></span> На рассмотрении</Typography>
                            </Box>
                        </Box>
                        <Box>

                            <Box sx={{width:"fit-content", marginLeft:"auto", marginRight:"0px",display:"flex"}}>
                                <Box sx={{textAlign:"center"}}>
                                    <Typography sx={{marginBottom:"8px"}}>Отправить на печать</Typography>
                                    <button className='main_btn' style={{textTransform:"capitalize"}}>
                                        Печать <span><img src='/images/transaction/printIcon.png'/></span>
                                    </button>
                                </Box>
                                <Box sx={{marginLeft:'35px', textAlign:"center"}}>
                                    <Typography sx={{marginBottom:"8px"}}>Сохранить информацию</Typography>
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
                        </Box>
                    </Grid>

                    <Grid sx={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px"}}> 
                        <Box>
                            <Typography sx={{color:'#342C2C',fontWeight:'500' , fontSize:"20px", mb:"10px"}}>Плательщик</Typography>
                            <Card sx={{boxShadow:"none", backgroundColor:"#EEEEEE"}}>
                                <CardContent>
                                    <Box sx={{display:'grid', gridTemplateColumns:"1fr 1fr", justifyContent:'space-between', alignItems:'center', mb:'20px'}}>
                                        <Typography variant={'body'}>Наименование организации </Typography>
                                        <Typography sx={{color:"#342C2C"}} variant={'body'}>{data.sent_date}</Typography>
                                    </Box>
                                    <Box sx={{display:'grid', gridTemplateColumns:"1fr 1fr", justifyContent:'space-between', alignItems:'center', mb:'20px'}}>
                                        <Typography variant={'body'}>МФО банка</Typography>
                                        <Typography sx={{color:"#342C2C"}} variant={'body'}>{data.sender_mfo}</Typography>
                                    </Box>
                                    <Box sx={{display:'grid', gridTemplateColumns:"1fr 1fr", justifyContent:'space-between', alignItems:'center', mb:'20px'}}>
                                        <Typography variant={'body'}>Расчетный счет </Typography>
                                        <Typography sx={{color:"#342C2C"}} variant={'body'}>На рассмотрении</Typography>
                                    </Box>
                                    <Box sx={{display:'grid', gridTemplateColumns:"1fr 1fr", justifyContent:'space-between', alignItems:'center', mb:'20px'}}>
                                        <Typography variant={'body'}>ИНН</Typography>
                                        <Typography sx={{color:"#342C2C"}} variant={'body'}>10 000 000,00 UZS</Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                        <Box>
                            <Typography sx={{color:'#342C2C',fontWeight:'500' , fontSize:"20px", mb:"10px"}}>Получатель</Typography>
                            <Card sx={{boxShadow:"none", backgroundColor:"#EEEEEE"}}>
                                <CardContent>
                                    <Box sx={{display:'grid', gridTemplateColumns:"1fr 1fr", justifyContent:'space-between', alignItems:'center', mb:'20px'}}>
                                        <Typography variant={'body'}>Наименование организации </Typography>
                                        <Typography sx={{color:"#342C2C"}} variant={'body'}>23.06.2023, 11:45</Typography>
                                    </Box>
                                    <Box sx={{display:'grid', gridTemplateColumns:"1fr 1fr", justifyContent:'space-between', alignItems:'center', mb:'20px'}}>
                                        <Typography variant={'body'}>МФО банка</Typography>
                                        <Typography sx={{color:"#342C2C"}} variant={'body'}>{data.receiver_mfo}</Typography>
                                    </Box>
                                    <Box sx={{display:'grid', gridTemplateColumns:"1fr 1fr", justifyContent:'space-between', alignItems:'center', mb:'20px'}}>
                                        <Typography variant={'body'}>Расчетный счет</Typography>
                                        <Typography sx={{color:"#342C2C"}} variant={'body'}>На рассмотрении</Typography>
                                    </Box>
                                    <Box sx={{display:'grid', gridTemplateColumns:"1fr 1fr", justifyContent:'space-between', alignItems:'center', mb:'20px'}}>
                                        <Typography variant={'body'}>ИНН</Typography>
                                        <Typography sx={{color:"#342C2C"}} variant={'body'}>10 000 000,00 UZS</Typography>
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

export default InvoicePreview