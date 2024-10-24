import API from './api'

const AdsGroupsService = (function () {
  const prefix = 'Clients/AdsGroups'
  const prefixFormat = platform => `${platform}/AdsGroups`

  // const prefix = "https://test.matrix.sa/Demo/Clients/AdsGroups"
  // const prefixFormat = platform => `https://test.matrix.sa/Demo/${platform}/AdsGroups`

  const get = params => {
    return API.get(`${prefix}/GetAdsGroupsV2`, params)
  }

  const getAll = params => {
    return API.get(`${prefix}/GetAllAdsGroups`, params)
  }

  const getById = async (platform, params) => {
    return API.get(`${prefixFormat(platform)}/GetAdGroup`, params)
  }

  const create = (platform, data) => {
    return API.post(`${prefixFormat(platform)}/CreateAdGroup`, data)
  }

  const update = (platform, params) => {
    return API.put(`${prefixFormat(platform)}/UpdateAdGroup`, params)
  }

  const activate = (platform, data) => {
    return API.put(`${prefixFormat(platform)}/ActivateAdGroup`, {}, { params: data })
  }

  const pause = (platform, data) => {
    return API.put(`${prefixFormat(platform)}/PauseAdGroup`, {}, { params: data })
  }

  const remove = (platform, params) => {
    return API.delete(`${prefixFormat(platform)}/DeleteAdGroup`, params)
  }

  return {
    get,
    getAll,
    getById,
    create,
    update,
    activate,
    pause,
    remove,
  }
})()

export default AdsGroupsService
