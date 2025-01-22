import API from './api'

const SocialPlatformsService = function (platform) {
  const prefix = `${platform}/Account`

  const checkAuthentication = async data => {
    return API.get(`${prefix}/check`, {})
  }

  const startAuthentication = data => {
    return API.get(`${prefix}/StartAuthentication`, {})
  }
  const cancelAuthentication = async () => {
    return API.put(`${prefix}/Diconnect`, {})
  }
  const getAdAccounts = async () => {
    return API.get(`${platform}/AdAccounts/GetAdAccounts`, {})
  }

  const getFacebookPages = async () => {
    return API.get(`${platform}/AdAccounts/GetFacebookPages`, {})
  }

  const getPixels = async AdAccountId => {
    return API.get(`${platform}/AdAccounts/GetPixels`, { AdAccountId })
  }

  const storeAdAccount = data => {
    return API.post(`${platform}/AdAccounts/SaveAdAccount`, data)
  }

  const getFundingInstruments = async AdAccountId => {
    return API.get(`${platform}/AdAccounts/GetFundingInstruments`, {
      AdAccountId,
    })
  }

  const getPublicProfiles = async AdAccountId => {
    return API.get(`${platform}/AdAccounts/GetPublicProfiles`, {
      AdAccountId,
    })
  }

  return {
    checkAuthentication,
    startAuthentication,
    getAdAccounts,
    storeAdAccount,
    getPixels,
    getFacebookPages,
    getFundingInstruments,
    getPublicProfiles,
    cancelAuthentication,
  }
}

export default SocialPlatformsService
