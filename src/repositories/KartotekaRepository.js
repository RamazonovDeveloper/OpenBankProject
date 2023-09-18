import Repository, { baseUrl } from './Repository'

class Kartoteka {
  async getKartoteka(data) {
    let endPoint = 'kartoteka'
    let access_token = JSON.parse(localStorage.getItem('access_token'))
    let companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

    let kartotekaList = await Repository.get(`${baseUrl}/${endPoint}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        companyTin: companyInfo?.inn
      }
    })
      .then(response => {
        console.log('accountsList => ', response.data)
        if (response.data.success) {
          let kartotekaData = response.data.data

          return kartotekaData
        }

        return null
      })
      .catch(err => {
        return err
      })

    return kartotekaList
  }
}

export default new Kartoteka()
