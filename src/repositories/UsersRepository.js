import Repository, { baseUrl } from './Repository'

class Users {
  async getUsers(data) {
    console.log('get user data')
    let endPoint = 'users'
    let access_token = JSON.parse(localStorage.getItem('access_token'))
    let companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

    let profile = await Repository.get(`${baseUrl}/${endPoint}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        companyTin: companyInfo?.inn
      }
    })
      .then(response => {
        console.log('users => ', response.data)
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

  async addUser(data) {
    console.log('user ', data)
    let endPoint = 'users'
    let access_token = JSON.parse(localStorage.getItem('access_token'))
    let companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

    let user = await Repository.post(`${baseUrl}/${endPoint}`, data, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        companyTin: companyInfo?.inn,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log('user edit=> ', response.data)

        return response.data
      })
      .catch(err => {
        console.log('user edit err=> ')

        return err
      })

    return user
  }

  async deleteUser(id) {
    console.log('user ', id)
    let endPoint = 'users'
    let access_token = JSON.parse(localStorage.getItem('access_token'))
    let companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

    let user = await Repository.delete(`${baseUrl}/${endPoint}/${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        companyTin: companyInfo?.inn
      }
    })
      .then(response => {
        console.log('user delete => ', response.data)

        return response.data
      })
      .catch(err => {
        console.log('user delete err=> ')

        return err
      })

    return user
  }

  async editUser(data) {
    console.log('edit user ', data)
    let endPoint = 'users'
    let access_token = JSON.parse(localStorage.getItem('access_token'))
    let companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

    let user = await Repository.put(`${baseUrl}/${endPoint}/${data.id}`, data, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        companyTin: companyInfo?.inn,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log('user edit=> ', response.data)

        return response.data
      })
      .catch(err => {
        console.log('user edit err=> ')

        return err
      })

    return user
  }
}

export default new Users()
