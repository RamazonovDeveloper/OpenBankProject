import Repository, { baseUrl } from './Repository'

class Permissions {
  async getMenuItems(data) {
    let endPoint = 'permissions'
    let access_token = JSON.parse(localStorage.getItem('access_token'))
    let companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

    if (access_token) {
      let items = await Repository.get(`${baseUrl}/${endPoint}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          companyTin: companyInfo?.inn
        }
      })
        .then(response => {
          console.log('res menu', response.data?.data)
          const menuArray = response.data?.data

          return menuArray
        })
        .catch(err => {
          return null
        })

      return items
    }
  }
}

export default new Permissions()
