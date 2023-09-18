import { useState } from 'react'
import DocumentsRepository from 'src/repositories/DocumentsRepository'

export default function useDocumentsFilter() {
  const [documentsList, setDocumentsList] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [singleDocument, setSingleDocument] = useState('')

  const [pdfFiles, setPdfFiles] = useState([])

  return {
    loading,
    pdfFiles,
    documentsList,
    singleDocument,
    setSingleDocument,
    getDocumentsList: async () => {
      const params = {
        perPage: 10,
        page: 1
      }
      setLoading(true)
      let localDocumentsList = await DocumentsRepository.getDocumentList(params)

      console.log('Documents list from useDocumentFilter js is : .......', localDocumentsList)

      if (localDocumentsList) {
        // let parsedBalancePayments = parsePaymentBalance2(paymentsList.data)
        setDocumentsList(localDocumentsList)
        setLoading(false)
        setError(null)
      } else {
        setError(true)
      }
    },
    getDocumentsByItsId: async params => {
      // const params = {
      //     perPage : 10,
      //     page : 1,
      // }

      let localDocumentsList = await DocumentsRepository.getDocumentById(params)

      // console.log("Documents list from useDocumentFilter js is : .......", localDocumentsList);

      if (localDocumentsList) {
        // let parsedBalancePayments = parsePaymentBalance2(paymentsList.data)
        setSingleDocument(localDocumentsList)
        setError(null)
      } else {
        setError(true)
      }
    },

    getDocumentsByItsIdPDFFiles: async params => {
      let localDocumentsList = await DocumentsRepository.getDocumentListPDF(params)

      if (localDocumentsList) {
        setPdfFiles(localDocumentsList)
        setError(null)
      } else {
        setError(true)
      }
    }
  }
}
