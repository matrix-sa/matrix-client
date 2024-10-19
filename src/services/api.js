import axios from '@/plugins/axious'

const API = (function () {
  const request = config => {
    return axios.request(config)
  }

  const get = (url, params, config) => {
    const uri = `${url}`

    return request({
      ...config,
      url: uri,
      params,
      method: 'GET',
    })
  }

  const post = (url, data, config) => {
    return request({
      ...config,
      url,
      data,
      method: 'POST',
    })
  }

  const put = (url, data, config) => {
    return request({
      ...config,
      url,
      data,
      method: 'PUT',
    })
  }

  const patch = (url, data, config) => {
    return request({
      ...config,
      url,
      data,
      method: 'PATCH',
    })
  }

  const del = (url, data, config) => {
    return request({
      ...config,
      url,
      params: data,
      method: 'DELETE',
    })
  }

  const setBaseURL = baseURL => {
    axios.defaults.baseURL = baseURL
  }

  const setHeader = (name, value) => {
    axios.defaults.headers.common[name.toLowerCase()] = value
  }

  return {
    get,
    post,
    put,
    patch,
    delete: del,
    setBaseURL,
    setHeader,
  }
})()

export default API
