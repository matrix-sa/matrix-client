import API from './api'

const ConnectionRuleService = (function () {
  const prefix = 'Clients/CampaignsRules'

  const getAll = () => {
    return API.get(`${prefix}/GetCommunicationRules`)
  }

  const run = data => {
    return API.post(`${prefix}/CreateCommunicationRule`, data)
  }

  return {
    run,
    getAll,
  }
})()

export default ConnectionRuleService
