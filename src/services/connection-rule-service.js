import API from './api'

const ConnectionRuleService = (function () {
  const prefix = 'Clients/CampaignsRules'

  const getAll = () => {
    return API.get(`${prefix}/GetCommunicationRules`)
  }

  const run = data => {
    return API.post(`${prefix}/CreateCommunicationRule`, data)
  }

  const update = data => {
    return API.put(`${prefix}/UpdateCommunicationRule`, data)
  }

  const changeStatus = data => {
    return API.put(`${prefix}/ChangeCommunicationRuleStatus`, data)
  }

  return {
    run,
    getAll,
    changeStatus,
    update,
  }
})()

export default ConnectionRuleService
