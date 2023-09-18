import axios from 'axios'

const baseDomain = process.env.NEXT_PUBLIC_PRODUCTION_BASE_DOMAIN // API for Bank

export const customHeaders = {
  Accept: 'application/json'
}

export const baseUrl = `${baseDomain}`

export default axios.create({
  baseUrl,
  headers: customHeaders
})
