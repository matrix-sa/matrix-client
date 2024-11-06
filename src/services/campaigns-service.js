import { useRoute } from 'vue-router'
import API from './api'

const CampaignsService = (function () {
  const prefix = 'Clients/Campaigns'

  const prefixFormat = platform =>
    platform
      ? `${platform}/Campaigns`
      : 'Clients/Campaigns'

  // const prefix = "https://test.matrix.sa/Demo/Clients/Campaigns"
  // const prefixFormat = platform => platform ?  `https://test.matrix.sa/Demo/${platform}/Campaigns` : "https://test.matrix.sa/Demo/Clients/Campaigns"

  const get = params => {
    return API.get(`${prefix}/GetCampaignsV2`, params)
  }

  const getAll = () => {
    return API.get(`${prefix}/GetAllCampaigns`)
  }

  const getById = params => {
    if (useRoute().query.platform === 'GoogleAds') {
      params.isGoogleAds = true
    }

    return API.get(`${prefix}/GetCampaign`, params)
  }

  const create = data => {
    return API.post(`${prefixFormat(data.platform)}/CreateCampaign`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  const update = data => {
    return API.put(`${prefixFormat(data.platform)}/UpdateCampaign`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  const startCampaign = data => {
    return API.put(
      `${prefixFormat(data.platform)}/ActivateCampaign`,
      {},
      {
        params: data,
      },
    )
  }

  const pauseCampaign = data => {
    return API.put(
      `${prefixFormat(data.platform)}/PauseCampaign`,
      {},
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: data,
      },
    )
  }

  const deleteCampaign = data => {
    return API.delete(`${prefixFormat(data.platform)}/DeleteCampaign`, data)
  }

  return {
    create,
    get,
    getAll,
    getById,
    update,
    startCampaign,
    pauseCampaign,
    deleteCampaign,
  }
})()

export default CampaignsService
