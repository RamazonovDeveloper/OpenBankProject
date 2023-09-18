import Repository, { baseUrl } from './Repository'

class Otp {
  create(data, callBack) {
    let endPoint = 'otp/create'

    let otp = Repository.post(`${baseUrl}/${endPoint}`, data)
      .then(response => {
        callBack(response)

        return response
      })
      .catch(err => {
        callBack(err.response)

        return err

        // if (errorCallback) errorCallback(err)
      })

    return otp
  }
}

export default new Otp()
