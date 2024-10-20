import API from './api'

const CampaignsRulesService = (function () {
  const prefix = 'Clients/CampaignsRules'

  const get = params => {
    return API.get(`${prefix}/GetCampaignsRulesV2`, params)
  }

  const getById = params => {
    return API.get(`${prefix}/GetCampaignRule`, params)
  }

  const create = data => {
    return API.post(`${prefix}/CreateCampaignRule`, data)
  }

  const update = data => {
    return API.put(`${prefix}/UpdateCampaignRule`, data)
  }

  const deleteRule = params => {
    return API.delete(`${prefix}/DeleteCampaignRule`, params)
  }

  const changeStatus = params => {
    return API.put(`${prefix}/ChangeCampaignRuleStatus`, {}, { params })
  }

  return {
    create,
    get,
    getById,
    update,
    deleteRule,
    changeStatus,
  }
})()

export default CampaignsRulesService
