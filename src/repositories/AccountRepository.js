import Repository, { baseUrl } from './Repository'

class Account {
  async getAccounts(data) {
    let endPoint = 'accounts'
    let access_token = JSON.parse(localStorage.getItem('access_token'))
    let companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

    let accountsList = await Repository.get(`${baseUrl}/${endPoint}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        companyTin: companyInfo?.inn
      }
    })
      .then(response => {
        console.log('accountsList => ', response.data)
        if (response.data.success) {
          let accountData = response.data.data

          return accountData
        }

        return null
      })
      .catch(err => {
        return null
      })

    return accountsList
  }

  async accountsSync(data) {
    let endPoint = 'accounts/sync'
    let access_token = JSON.parse(localStorage.getItem('access_token'))
    let companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

    let accountsList = await Repository.post(
      `${baseUrl}/${endPoint}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          companyTin: companyInfo?.inn
        }
      }
    )
      .then(response => {
        console.log('accountsSync => ', response.data)
        if (response.data.success) {
          let accountData = response.data.data

          return accountData
        }

        return null
      })
      .catch(err => {
        return null
      })

    return accountsList
  }

  async getAccountById(id) {
    console.log('===== ', id)
    let endPoint = 'accounts'
    let access_token = JSON.parse(localStorage.getItem('access_token'))
    let companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

    let accountsList = await Repository.get(`${baseUrl}/${endPoint}?account_id=${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        companyTin: companyInfo?.inn
      }
    })
      .then(response => {
        console.log('accountsList => ', response.data)
        if (response.data.success) {
          let accountData = response.data.data

          return accountData
        }

        return null
      })
      .catch(err => {
        return null
      })

    return accountsList
  }

  async accountSync(id) {
    let endPoint = `accounts/${id}/balance`
    let access_token = JSON.parse(localStorage.getItem('access_token'))
    let companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

    let accountsList = await Repository.get(`${baseUrl}/${endPoint}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        companyTin: companyInfo?.inn
      }
    })
      .then(response => {
        console.log('account Sync => ', response.data)
        if (response.data.success) {
          let accountData = response.data.data

          return accountData
        }

        return null
      })
      .catch(err => {
        return null
      })

    return accountsList
  }

  async accountsFromBanks() {
    let endPoint = 'accounts/sync'
    let access_token = JSON.parse(localStorage.getItem('access_token'))
    let companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

    let accountsList = await Repository.post(
      `${baseUrl}/${endPoint}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          companyTin: companyInfo?.inn
        }
      }
    )
      .then(response => {
        if (response.data.success) {
          let accountData = response.data.data

          return accountData
        }

        return null
      })
      .catch(err => {
        return err
      })

    return accountsList
  }
}

export default new Account()
