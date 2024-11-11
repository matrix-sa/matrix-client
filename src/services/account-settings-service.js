import API from './api'

const AccountSettingsService = (function () {
  const prefix = `Clients/Account`

  const getAccountData = () => {
    return API.get(`${prefix}/index`, {})
  }

  const updateAccountData = data => {
    return API.post(`${prefix}/UpdateCustomerInfo`, data)
  }
  return {
    getAccountData,
    updateAccountData,
  }
})()

export default AccountSettingsService
