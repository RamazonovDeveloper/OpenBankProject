import React, { useState } from 'react'
import LoanAgreement from 'src/repositories/LoanAgreementRepository'
import AccountRepository from 'src/repositories/AccountRepository'
import LoanAgreementRepository from 'src/repositories/LoanAgreementRepository'

export default function useLoanAgreementFilter() {
  const [loanItems, setLoanItems] = useState([])
  const [error, setError] = useState(null)
  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isSigned, setIsSigned] = useState(null)

  return {
    loading,
    isSigned,
    setIsSigned: data => {
      setIsSigned(data)
    },
    loanItems,
    error,
    setError: status => {
      setError(status)
    },
    getLoanItems: async params => {
      let loanList = await LoanAgreementRepository.getLoanAgreement(params)
      console.log('loanList FROM API NEW DOCUMENTS SECTION', loanList)
      if (loanList) {
        setLoanItems(loanList)
        setError(null)
      } else {
        setError(true)
      }
    },
    setSighnToDocument: async params => {
      setLoading(true)
      console.log('setSighnToDocument', params)

      let setSighn = await LoanAgreementRepository.putHashToSighn(params)
      console.log('lsetSighn', setSighn)

      setLoading(false)
      setIsSigned(setSighn)

      // if (setSighn.response.status != 500) {
      //   setLoanItems(setSighn.data)
      //   setError(null)
      // } else {
      //   console.log('set Error worked')
      //   setError(setSighn.response.data.message)
      // }
    }
  }
}
