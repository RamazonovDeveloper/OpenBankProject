import React, { useState, useEffect, useRef } from 'react'
import PaymentRepository from 'src/repositories/PaymentRepository'
import AccountRepository from 'src/repositories/AccountRepository'
import { parsePaymentBalance2 } from 'src/utils/sumWithPenny'
import { removeHours } from 'src/utils/common'
import Router, { useRouter } from 'next/router'

export default function usePaymentFilter() {
  const isMounted = useRef(false)
  const router = useRouter()
  const { pathname } = router
  const [dataObj, setDataObj] = useState(null)
  const [rowItems, setRowItems] = useState([])
  const [accountItems, setAccountItems] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const [date_from, setDate_from] = useState(null)
  const [date_till, setDate_till] = useState(null)
  const [type, setType] = useState(0)
  const [account_id, setAccount_id] = useState(null)
  const [receiver_inn, setReceiver_inn] = useState(null)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(5)

  const [export_type, setExport_type] = useState('pdf')
  const [file, setFile] = useState('')

  useEffect(() => {
    setLoading(true)
    if (isMounted.current || !pathname.includes('preview')) {
      getPaymentsList()
      setLoading(false)
    } else {
      isMounted.current = true
    }
  }, [account_id, type, date_from, date_till, receiver_inn, page, type, perPage])

  const getPaymentsList = async () => {
    const params = {
      account_id: account_id,
      type: type,
      date_from: date_from,
      date_till: date_till,
      receiver_inn: receiver_inn,
      page: page,
      perPage: perPage
    }
    let paymentsList = await PaymentRepository.getPayments(params)
    console.log('paymentsList paymentsList', paymentsList)
    console.log('tyope -> ', typeof paymentsList)
    if (paymentsList && typeof paymentsList == 'object') {
      let parsedBalancePayments = parsePaymentBalance2(paymentsList.data)
      console.log('ssssss-> ', paymentsList)

      // parsedBalancePayments = removeHours(parsedBalancePayments)
      setRowItems(parsedBalancePayments)
      setDataObj(paymentsList.meta)
      setError(null)
    } else if (typeof paymentsList == 'number' && paymentsList == 412) {
      router.push('/accept')
    } else {
      setError(true)
    }
  }

  return {
    dataObj,
    page,
    setPerPage,
    loading,
    type,
    rowItems,
    file,
    error,
    accountItems,
    data: {
      date_from,
      date_till,
      type,
      account_id,
      receiver_inn,
      export_type
    },
    setError: status => {
      setError(status)
    },
    setPage: page => {
      setPage(page)
    },
    setExport_type: type => {
      setExport_type(type)
    },
    setAccount_id: id => {
      setAccount_id(id)
    },
    setType: type => {
      setType(type)
    },
    setDate_from: from => {
      setDate_from(from)
    },
    setDate_till: till => {
      setDate_till(till)
    },
    setReceiver_inn: inn => {
      setReceiver_inn(inn)
    },
    getPaymentsList,

    confirmPayment: async params => {
      let paymentsList = await PaymentRepository.confirmPayment(params)

      return paymentsList
    },
    getAccountsList: async () => {
      let accountsList = await AccountRepository.getAccounts()

      if (accountsList) {
        setAccountItems(accountsList)
        setError(null)
      } else {
        setError(true)
      }
    },
    getPaymentsListAsFile: async (type, id) => {
      const params = {
        // date_from,
        // date_till,

        // receiver_inn: receiver_inn,
        export_type: type,
        payment_id: id
      }

      const url = 'http://openbanking.opentech.uz/api/v1/payments/export'

      const queryString = new URLSearchParams(params).toString()

      fetch(`${url}?${queryString}`, {
        method: 'GET',
        headers: {
          companyTin: '306687969',
          Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNjljMDE4ZTk1ZTg3MzJiNTg0Y2EzYzUxNTFlMDQyMDZmMzdlZGRjMDgyMDcwM2FkZTA5MTJiZTdlYWJmYTVlMzVmZDU3MjY5YWRjNGZlMzciLCJpYXQiOjE2OTQwODI0OTguNDI2Nzk4LCJuYmYiOjE2OTQwODI0OTguNDI2ODAzLCJleHAiOjE3MjU3MDQ4OTguNDEyMzk0LCJzdWIiOiIxIiwic2NvcGVzIjpbIioiXX0.U3BzwVEWHlD6N8-SJbsLYNNbzPWKGePLU3_F5ncX0x09lXxStVRr9hEmAgeykU1UbRqCLKuLmPl-XbPL3tVPkwcYTzKoaapPpgjugSkRGvCf5wGbOoIwpvaNm5ef-ce__R8hP0ikudYC4I2o-i5bFSqXtrLF90rbXNNVbY6QpqPUTm4mjbU4VrMxWWq-zcfNTux2n5-jlz_kTQpCT4WPClo5dOvxFvi4UNV3A2NUMbGACjY-X24e3AdKTc0IeUws750KDKmdY2xxDslHbbiXnGSXuJyz8mzbkxYbZ7KeAagAfuLMLDTJRguS0q6hHcb5jEXQ2PxXHgwQAQ-6RnMGM4X1CB_zDN_wO_AOvb3Lh57Y-7-_iDDEkZmg2rhfjvvo_NVQ_52HdDlaNLhnlApnmcfPRPb02EAw_z9wNzeda4koiu_XVw-NQD658yeQqqPGKKwC9ejvztOJCkV6Bmo7RiL67P4ByC4gdcW9x4xDKswIw1vgHasNb4DKep61d-BTCb1efyCAjVy020X6RBG4hIN-AHB5m77b8QT8uAjcNwOXHqwEpTFrTgb_MnLb-rveyDFidv3tlTOl9oTuKw94J7HuRJg4wK7JfDF-cTLeltTlcoOYOEgooCi9iEeHSSTQ48h9NMX-3dpwLcA-CfYamkcosLQMcUYYkKIOiq7cksE'
        }
      })
        .then(response => response.blob())
        .then(blob => {
          // Create a temporary URL object to generate a download link
          const url = window.URL.createObjectURL(new Blob([blob]))

          // Create a link element and set its attributes
          const link = document.createElement('a')
          link.href = url
          if (type === 'pdf') link.setAttribute('download', 'open_banking_file.pdf')
          if (type === 'excel') link.setAttribute('download', 'open_banking_file.xlsx')

          // Append the link to the document body and click it programmatically
          document.body.appendChild(link)
          link.click()

          // Clean up the temporary URL object
          window.URL.revokeObjectURL(url)
        })
        .catch(error => {
          console.error('Error:', error)
        })
    }
  }
}
