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

const InvoicePreview = ({ paymentId }) => {
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
    <Preview data={data} confirmPaymentHandle={confirmPaymentHandle} isPaymentSent={isPaymentSent} />
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
