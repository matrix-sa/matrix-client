import API from './api'

const CampaignRuleService = (function () {
  const run = data => {
    return API.post(`/Clients/CampaignsRules/CreateCampaignRuleV2`, data)
  }

  return {
    run,
  }
})()

export default CampaignRuleService
