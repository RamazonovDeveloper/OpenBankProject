import Repository, { baseUrl } from './Repository'

class User {
  async viewProfile(data) {
    let endPoint = 'profile'
    let access_token = JSON.parse(localStorage.getItem('access_token'))
    let companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

    let profile = await Repository.get(`${baseUrl}/${endPoint}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        companyTin: companyInfo?.inn
      }
    })
      .then(response => {
        console.log('profile => ', response.data)
        if (response.data.success) {
          let accountData = response.data.data

          return accountData
        }

        return null
      })
      .catch(err => {
        return err
      })

    return profile
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

export default new User()
