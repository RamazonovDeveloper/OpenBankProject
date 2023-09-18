import Repository, { baseUrl } from './Repository'

class Document {
  async getDocumentList(params) {
    let endPoint = 'documents'
    let access_token = JSON.parse(localStorage.getItem('access_token'))
    let companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

    let paymentsList = await Repository.get(`${baseUrl}/${endPoint}`, {
      params: { ...params },

      headers: {
        Authorization: `Bearer ${access_token}`,
        companyTin: companyInfo?.inn
      }
    })
      .then(response => {
        console.log('payments => ', response.data)
        if (response.data.success) {
          let tableData = response.data.data

          return tableData
        }

        return null
      })
      .catch(err => {
        return null
      })

    return paymentsList
  }

  async getDocumentListPDF(params) {
    console.log('BBBBBB getDocumentById props is FROM DOCUMENT REPOSITORY IS ', params)

    let endPoint = 'documents'
    let access_token = JSON.parse(localStorage.getItem('access_token'))
    let companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

    let paymentsList = await Repository.get(`${baseUrl}/${endPoint}/${params}`, {
      params: { ...params },
      headers: {
        Authorization: `Bearer ${access_token}`,
        companyTin: companyInfo?.inn
      }
    })
      .then(response => {
        console.log('payments => ', response.data)
        if (response.data.success) {
          let tableData = response.data.data

          return tableData
        }

        return null
      })
      .catch(err => {
        return null
      })

    return paymentsList || 'salom'
  }

  async getDocumentById(params) {
    console.log('BBBBBB getDocumentById props is FROM DOCUMENT REPOSITORY IS ', params)

    let endPoint = 'documents'
    let access_token = JSON.parse(localStorage.getItem('access_token'))
    let companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

    let paymentsList = await Repository.get(`${baseUrl}/${endPoint}/${params}`, {
      params: { ...params },
      headers: {
        Authorization: `Bearer ${access_token}`,
        companyTin: companyInfo?.inn
      }
    })
      .then(response => {
        console.log('payments => ', response.data)
        if (response.data.success) {
          let tableData = response.data.data

          return tableData
        }

        return null
      })
      .catch(err => {
        return null
      })

    return paymentsList || 'salom'
  }
}

export default new Document()
