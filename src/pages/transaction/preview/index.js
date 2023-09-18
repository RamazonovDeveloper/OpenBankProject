// ** Demo Components Imports
import { useEffect, useState } from 'react'
import Preview from 'src/views/apps/transaction/preview/Preview'
import { useCompany } from 'src/hooks/useCompany'
import PaymentRepository, { baseUrl } from 'src/repositories/PaymentRepository'
import usePayment from 'src/hooks/usePayment'
import useEimzo from 'src/hooks/useEimzo'
import EIMZO from 'src/lib/Eimzo'
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'
import { Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material'

const InvoicePreview = props => {
  const { paymentId } = props

  console.log('15 15 15 15 15 Payment id inside of the payment by id js', props)

  const router = useRouter()
  const [data, setData] = useState(null)

  const [open, setOpen] = useState(false)
  const [paymentMessage, setPaymentMessage] = useState('')

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
    console.log('single payment => ', res)
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
          setOpen(true)
          setPaymentMessage(payment.message)
        }
      }
    }
  }

  useEffect(() => {
    getInfo()
  }, [])

  const handleClose = () => {
    let companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

    setOpen(false)
    router.push(`/${companyInfo.slug}/transaction`)
  }

  return data ? (
    <>
      <Preview
        data={data}
        confirmPaymentHandle={confirmPaymentHandle}
        isPaymentSent={isPaymentSent}
        handleClose={handleClose}
        open={open}
        paymentMessage={paymentMessage}
      />
    </>
  ) : (
    <Box sx={{ display: 'flex', width: '100%', height: '70vh', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
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
