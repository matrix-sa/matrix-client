import API from './api'

const ConnectionRuleService = (function () {
  const run = data => {
    return API.post(`/Clients/CampaignsRules/CreateCommunicationRule`, data)
  }

  return {
    run,
  }
})()

export default ConnectionRuleService
