import Repository, { baseUrl } from './Repository'

class Company {
  async companyInfo(data, callBack) {
    let endPoint = 'company/info'

    let companyInfo = await Repository.post(`${baseUrl}/${endPoint}`, data)
      .then(response => {
        console.log('companyInfo response', response)

        return response
      })
      .catch(err => {
        console.log('companyInfo err', err)

        return err.response
      })

    return companyInfo
  }

  otpCreate(data, callBack) {
    let endPoint = 'otp/create'
    console.log('data', data)
    Repository.post(`${baseUrl}/${endPoint}`, data)
      .then(response => {
        callBack(response)

        return response
      })
      .catch(err => {
        callBack(err.response)

        return err

        // if (errorCallback) errorCallback(err)
      })
  }

  companyCreate(data, callBack) {
    console.log('Company AXIOS')
    const endPoint = 'company/create'

    const company = Repository.post(`${baseUrl}/${endPoint}`, data)
      .then(response => {
        console.log('company create response', response)
        callBack(response)

        return response
      })
      .catch(err => {
        console.log('company create err', err)
        callBack(err.response)

        return err.response

        // if (errorCallback) errorCallback(err)
      })

    return company
  }
}

export default new Company()
