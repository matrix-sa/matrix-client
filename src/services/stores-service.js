import API from './api'

const StoresService = (function () {
  const prefix = 'Clients/Websites'

  const get = params => {
    return API.get(`${prefix}/GetWebsites`, params)
  }

  const getById = params => {
    return API.get(`${prefix}/GetWebsite`, params)
  }

  const create = data => {
    return API.post(`${prefix}/CreateWebsite`, data)
  }

  const update = data => {
    return API.put(`${prefix}/UpdateWebsite`, data)
  }

  const activate = data => {
    return API.put(`${prefix}/ActivateWebsite`, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
  }

  const deactivate = data => {
    return API.put(`${prefix}/DeactivateWebsite`, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
  }

  const deleteStore = params => {
    return API.delete(`${prefix}/DeleteWebsite`, params)
  }

  const checkAuthentication = (type, params) => {
    return API.get(`${type}/Account/Check`, params)
  }

  const startAuthentication = (type, params) => {
    console.log('Ho')
    return API.get(`${type}/Account/StartAuthentication`, params)
  }

  const disconnectSalla = () => {
    return API.get(`Salla/Account/Logout`)
  }

  return {
    create,
    get,
    getById,
    update,
    activate,
    deactivate,
    deleteStore,
    checkAuthentication,
    startAuthentication,
    disconnectSalla,
  }
})()

export default StoresService
