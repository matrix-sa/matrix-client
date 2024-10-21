import API from './api'

const CampaignRuleService = (function () {
  const prefix = 'Clients/CampaignsRules'

  const getAll = () => {
    return API.get(`${prefix}/GetCampaignsRulesV2`)
  }

  const run = data => {
    return API.post(`${prefix}/CreateCampaignRuleV2`, data)
  }

  return {
    run,
    getAll,
  }
})()

export default CampaignRuleService
