import Repository, { baseUrl } from './Repository'

class LoanAgreement {
  async getLoanAgreement(params) {
    let endPoint = 'documents'
    let access_token = JSON.parse(localStorage.getItem('access_token'))
    let companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

    let paymentsList = await Repository.get('http://openbanking.opentech.uz/api/v1/documents?perPage=1&page=1', {
      headers: {
        Authorization: `Bearer ${access_token}`,
        companyTin: companyInfo?.inn
      }
    })
      .then(response => {
        console.log('documents => ', response.data)
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

  async getLoanAgreementById(id) {
    let endPoint = 'documents'

    // id = '9e7b6409-32ca-4612-919c-9bbf05919bac'
    let access_token = JSON.parse(localStorage.getItem('access_token'))
    let companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

    let paymentById = await Repository.get(`${baseUrl}/${endPoint}/${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        companyTin: companyInfo?.inn
      }
    })
      .then(response => {
        console.log(response)
        if (response.data) {
          return response.data
        }
      })
      .catch(err => {
        return err
      })

    return paymentById
  }

  async putHashToSighn(params) {
    console.log('putHashToSighn data')
    console.log(params)
    let endPoint = 'documents'
    let access_token = JSON.parse(localStorage.getItem('access_token'))
    let companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

    let body = {
      hash: params.hash
    }

    let ress = await Repository.put(`${baseUrl}/${endPoint}/${params.uuid_code}/sign`, body, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        companyTin: companyInfo?.inn
      }
    })
      .then(response => {
        console.log('response', response)
        if (response.data) {
          return response.data
        }
      })
      .catch(err => {
        return err
      })

    return ress
  }
}

export default new LoanAgreement()
