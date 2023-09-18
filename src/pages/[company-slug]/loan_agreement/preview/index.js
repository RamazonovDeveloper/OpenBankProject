// ** Demo Components Imports
import { useEffect, useState } from 'react'
import LoanAgreement from 'src/views/apps/loan_agreement/preview/LoanAgreement'
import { useCompany } from 'src/hooks/useCompany'
import LoanAgreementRepository from 'src/repositories/LoanAgreementRepository'

const InvoicePreview = ({ paymentId }) => {
  const [data, setData] = useState(null)

  async function getInfo(params) {
    let res = await LoanAgreementRepository.getLoanAgreementById(paymentId)
    res && setData(res.data)
  }

  useEffect(() => {
    getInfo()
  }, [])

  return data ? <LoanAgreement data={data} getInfo={getInfo} /> : <div>Загрузка..</div>
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
