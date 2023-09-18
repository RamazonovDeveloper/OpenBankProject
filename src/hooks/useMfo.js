import React, { useState, useEffect } from 'react'
import PaymentRepository from 'src/repositories/PaymentRepository'

export default function useMfo() {
  const [mfoList, setMfoList] = useState([])
  const [mfo, setMfo] = useState(null)
  const [paymentCodeReference, setPaymentCodeReference] = useState([])
  const [paymentCode, setPaymentCode] = useState(null)
  const [treasuryReferences, setTreasuryReferences] = useState([])
  const [treasury, setTreasury] = useState(null)
  const [budgetReferences, setBudgetReferences] = useState([])
  const [budget, setBudget] = useState(null)

  const getMfoList = async () => {
    const data = await PaymentRepository.getMfoList()
    console.log('mfoList => ', data)
    if (data.data) {
      setMfoList(data.data.data)
    }
  }

  const getPaymentCodeReferences = async () => {
    const data = await PaymentRepository.getPaymentCodeReferences()
    if (data.data) {
      setPaymentCodeReference(data.data.data)
    }
  }

  const getTreasuryReferences = async () => {
    const data = await PaymentRepository.getTreasuryReferences()
    if (data.data) {
      setTreasuryReferences(data.data.data)
    }
  }

  const getBudgetReferences = async () => {
    const data = await PaymentRepository.getBudgetReferences()
    if (data.data) {
      setBudgetReferences(data.data.data)
    }
  }

  useEffect(() => {
    getMfoList()
    getPaymentCodeReferences()
    getTreasuryReferences()
    getBudgetReferences()
  }, [])

  return {
    treasuryReferences,
    budgetReferences,
    budget,
    setBudget,
    treasury,
    setTreasury,
    mfoList,
    paymentCodeReference,
    setPaymentCode,
    paymentCode,
    setMfo,
    mfo
  }
}
