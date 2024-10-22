import API from './api'

const CampaignRuleService = (function () {
  const prefix = 'Clients/CampaignsRules'

  const getAll = () => {
    return API.get(`${prefix}/GetCampaignsRulesV2`)
  }

    const getById = params => {
    return API.get(`${prefix}/GetCampaignRuleV2`, params, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }


  const run = data => {
    return API.post(`${prefix}/CreateCampaignRuleV2`, data)
  }

  const update = data => {
    return API.put(`${prefix}/UpdateCampaignRuleV2`, data)
  }


  const changeStatus = data => {
    return API.put(`${prefix}/ChangeCampaignRuleStatusV2`, data)
  }

  return {
    run,
    getAll,
    changeStatus,
    getById,
    update
  }
})()

export default CampaignRuleService
