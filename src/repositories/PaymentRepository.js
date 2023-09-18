import Repository, { baseUrl } from './Repository'

class Payment {
  async getPayments(params) {
    let endPoint = 'payments'
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
        if (response.status == 200) {
          let tableData = response.data.data

          return tableData
        }
        if (response.status == 412) {
          return response.status
        }

        return null
      })
      .catch(err => {
        return null
      })

    return paymentsList
  }

  async getPaymentById(id) {
    let endPoint = 'payments'
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

  async addPayment(data) {
    console.log(data)
    let endPoint = 'payments'
    let access_token = JSON.parse(localStorage.getItem('access_token'))
    let companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

    let ress = await Repository.post(`${baseUrl}/${endPoint}`, data, {
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

    return ress
  }
  async editPayment(data) {
    console.log(data)
    let endPoint = `payments/${data.id}`
    let access_token = JSON.parse(localStorage.getItem('access_token'))
    let companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

    let ress = await Repository.put(`${baseUrl}/${endPoint}`, data, {
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

    return ress
  }

  async confirmPayment(params) {
    console.log('confirmPayment params', params)
    let endPoint = 'payments'
    let access_token = JSON.parse(localStorage.getItem('access_token'))
    let companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

    let ress = await Repository.patch(
      `${baseUrl}/${endPoint}/${params.id}`,
      {
        hash: params.hash
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          companyTin: companyInfo?.inn
        }
      }
    )
      .then(response => {
        console.log(response)
        if (response.data) {
          return response.data
        }
      })
      .catch(err => {
        if (err.response) {
          return err.response.data
        }

        return err
      })

    return ress
  }

  async getPaymentsFile(params) {
    let endPoint = 'payments/export'
    let access_token = JSON.parse(localStorage.getItem('access_token'))
    let companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

    let paymentsList = await Repository.get(`${baseUrl}/${endPoint}`, {
      params: { ...params },
      headers: {
        Authorization: `Bearer ${access_token}`,
        companyTin: companyInfo?.inn,
        'Content-Type': 'application/pdf'
      }
    })
      .then(response => response.blob())
      .then(blob => {
        return blob
      })
      .catch(err => {
        return null
      })

    return paymentsList
  }
  async getMfoList() {
    console.log('Mfo List ============ ')
    let endPoint = 'bank-references'
    let access_token = JSON.parse(localStorage.getItem('access_token'))
    let companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

    let mfoList = await Repository.get(`${baseUrl}/${endPoint}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        companyTin: companyInfo?.inn
      }
    })
      .then(response => {
        console.log('Mfo List => ', response.data)
        if (response.data.success) {
          let listData = response.data.data

          return listData
        }

        return null
      })
      .catch(err => {
        return null
      })

    return mfoList
  }

  async getPaymentCodeReferences() {
    console.log('getPaymentCodeReferences ')
    let endPoint = 'payment-code-references'
    let access_token = JSON.parse(localStorage.getItem('access_token'))
    let companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

    let paymentCodeRef = await Repository.get(`${baseUrl}/${endPoint}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        companyTin: companyInfo?.inn
      }
    })
      .then(response => {
        console.log('Mfo List => ', response.data)
        if (response.data.success) {
          let code = response.data.data

          return code
        }

        return null
      })
      .catch(err => {
        return null
      })

    return paymentCodeRef
  }
  async getTreasuryReferences() {
    console.log('treasuryReferences ')
    let endPoint = 'treasury-references'
    let access_token = JSON.parse(localStorage.getItem('access_token'))
    let companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

    let paymentCodeRef = await Repository.get(`${baseUrl}/${endPoint}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        companyTin: companyInfo?.inn
      }
    })
      .then(response => {
        console.log('treasuryReferences => ', response.data)
        if (response.data.success) {
          let code = response.data.data

          return code
        }

        return null
      })
      .catch(err => {
        return null
      })

    return paymentCodeRef
  }
  async getBudgetReferences() {
    console.log('budgetReferences')
    let endPoint = 'budget-references'
    let access_token = JSON.parse(localStorage.getItem('access_token'))
    let companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

    let paymentCodeRef = await Repository.get(`${baseUrl}/${endPoint}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        companyTin: companyInfo?.inn
      }
    })
      .then(response => {
        console.log('budgetReferences => ', response.data)
        if (response.data.success) {
          let code = response.data.data

          return code
        }

        return null
      })
      .catch(err => {
        return null
      })

    return paymentCodeRef
  }
}

export default new Payment()
