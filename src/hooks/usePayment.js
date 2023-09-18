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

      // parsedBalancePayments = removeHours(parsedBalancePayments)
      setRowItems(parsedBalancePayments)
      setDataObj(paymentsList)
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
    getPaymentsListAsFile: async () => {
      const params = {
        account_id: account_id,
        type: type,
        date_from: date_from,
        date_till: date_till,
        receiver_inn: receiver_inn,
        export_type: export_type,
        payment_id: 15
      }

      let paymentsList = await PaymentRepository.getPaymentsFile(params)
      console.log('paymentsList paymentsList', paymentsList)
      if (paymentsList) {
        let parsedBalancePayments = parsePaymentBalance2(paymentsList.data)
        setFile(parsedBalancePayments)
        setError(null)
      } else {
        setError(true)
      }
    }
  }
}
