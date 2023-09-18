import Repository, { baseUrl } from './Repository'

class Templates {
  async getTemplates(data) {
    let endPoint = 'payment-templates'
    let access_token = JSON.parse(localStorage.getItem('access_token'))
    let companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

    let template = await Repository.get(`${baseUrl}/${endPoint}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        companyTin: companyInfo?.inn
      }
    })
      .then(response => {
        console.log('template => ', response.data)
        if (response.data.success) {
          let accountData = response.data.data

          return accountData
        }

        return null
      })
      .catch(err => {
        return err
      })

    return template
  }

  async getTemplateById(id) {
    let endPoint = 'payment-templates'
    let access_token = JSON.parse(localStorage.getItem('access_token'))
    let companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

    let singleData = await Repository.get(`${baseUrl}/${endPoint}/${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        companyTin: companyInfo?.inn
      }
    })
      .then(response => {
        console.log('id singleData => ', response.data)
        if (response.data.success) {
          let accountData = response.data.data

          return accountData
        }

        return null
      })
      .catch(err => {
        return err
      })

    return singleData
  }

  async addTemplate(data) {
    let endPoint = 'payment-templates'
    let access_token = JSON.parse(localStorage.getItem('access_token'))
    let companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

    let user = await Repository.post(`${baseUrl}/${endPoint}`, data, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        companyTin: companyInfo?.inn
      }
    })
      .then(response => {
        console.log('tamplate adding => ', response.data)

        return response.data
      })
      .catch(err => {
        console.log('tamplate adding => ')

        return err
      })

    return user
  }

  async updateProfile(data, photo) {
    console.log('update ', data)

    var queryString = Object.keys(data)
      .map(key => key + '=' + data[key])
      .join('&')
    console.log('queryString', queryString)

    let endPoint = 'profile'
    let access_token = JSON.parse(localStorage.getItem('access_token'))
    let companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

    let profile = await Repository.post(
      `${baseUrl}/${endPoint}?${queryString}`,
      {
        photo: photo
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          companyTin: companyInfo?.inn,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      }
    )
      .then(response => {
        console.log('profile edit=> ', response.data)

        return response.data
      })
      .catch(err => {
        console.log('profile edit err=> ')

        return err
      })

    return profile
  }
}

export default new Templates()
