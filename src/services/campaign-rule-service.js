import API from './api'

const CampaignRuleService = (function () {
  const prefix = 'Clients/CampaignsRules'

  const getAll = () => {
    return API.get(`${prefix}/GetControlRules`)
  }

  const getById = params => {
    return API.get(`${prefix}/GetControlRule`, params, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  const run = data => {
    return API.post(`${prefix}/CreateControlRule`, data)
  }

  const update = data => {
    return API.put(`${prefix}/UpdateControlRule`, data)
  }

  const changeStatus = data => {
    return API.put(`${prefix}/ChangeControlRuleStatus`, data)
  }

  const deleteRule = data => {
    return API.delete(`${prefix}/DeleteControlRule`, data)
  }

  return {
    run,
    getAll,
    changeStatus,
    getById,
    update,
    deleteRule,
  }
})()

export default CampaignRuleService
