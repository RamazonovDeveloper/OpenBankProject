import React, { useState, useEffect } from 'react'
import AccountRepository from 'src/repositories/AccountRepository'
import sumWithPenny, { parsePaymentBalance } from 'src/utils/sumWithPenny'

export default function usePaymentFilter() {
  const [accountItems, setAccountItems] = useState([])
  const [sum, setSum] = useState(null)
  const [loadingAsync, setLoadingAsync] = useState(false)
  const [loadingSingleAsync, setLoadingSingleAsync] = useState(false)

  const getAccountsList = async () => {
    let paymentsList = await AccountRepository.getAccounts()

    if (paymentsList) {
      // setAccountItems(paymentsList)

      // let sumParsed = sumWithPenny(paymentsList)
      // setSum(sumParsed)
      // console.log('penny', paymentsList)

      let parsedBalancePayments = parsePaymentBalance(paymentsList)
      setAccountItems(parsedBalancePayments)
    }
  }

  useEffect(() => {
    getAccountsList()
  }, [])

  return {
    accountItems,
    sum,
    loadingAsync,
    loadingSingleAsync,
    setAccountItems: id => {
      setAccountItems(id)
    },
    accountsSync: async () => {
      setLoadingAsync(true)

      let paymentsList = await AccountRepository.accountsSync()

      if (paymentsList) {
        let sumParsed = sumWithPenny(paymentsList)
        setSum(sumParsed)

        let parsedBalancePayments = parsePaymentBalance(paymentsList)
        setAccountItems(parsedBalancePayments)
      }

      setLoadingAsync(false)
    },
    accountSync: async id => {
      setLoadingSingleAsync(true)
      let payment = await AccountRepository.accountSync(id)
      setLoadingSingleAsync(false)

      // if (payment) {
      //   if (payment.success) {
      //     let parsedBalancePayment = parsePaymentBalance([payment])
      //     setAccountItems(parsedBalancePayment)
      //   }
      // }
    },
    getAccountsList: getAccountsList
  }
}
