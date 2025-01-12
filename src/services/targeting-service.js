import API from './api'

const TargetingService = (function () {
  const prefix = ''

  const getTwitterCountries = () => {
    return API.get(`${prefix}/Twitter/Targeting/GetCountries`)
  }

  const getTwitterCities = params => {
    return API.get(`${prefix}/Twitter/Targeting/GetCities`, params)
  }

  const getTikTokCountries = () => {
    return API.get(`${prefix}/TikTok/Targeting/GetCountries`)
  }

  const getTikTokCountryProvinces = params => {
    return API.get(`${prefix}/TikTok/Targeting/GetCountryProvinces`, params)
  }

  const getTikTokIdentities = () => {
    return API.get(`${prefix}/TikTok/Targeting/GetIdentities`)
  }

  const getSnapchatCountries = () => {
    return API.get(`${prefix}/Snapchat/Targeting/GetCountries`)
  }

  const getMetaCountries = () => {
    return API.get(`${prefix}/Meta/Targeting/GetCountries`)
  }

  const getMetaRegions = params => {
    return API.get(`${prefix}/Meta/Targeting/GetRegions`, params)
  }

  const getMetaCities = params => {
    return API.get(`${prefix}/Meta/Targeting/GetCities`, params)
  }

  const getSupportedCountries = platform => {
    return API.get(`${platform}/Targeting/GetCountries`)
  }

  const getGoogleSuggestedLocations = params => {
    return API.get(
      `${prefix}/GoogleAds/Targeting/GetSuggestedLocations`,
      params,
    )
  }

  return {
    getTwitterCountries,
    getTwitterCities,
    getTikTokCountries,
    getTikTokCountryProvinces,
    getTikTokIdentities,
    getSnapchatCountries,
    getMetaCountries,
    getMetaRegions,
    getMetaCities,
    getSupportedCountries,
    getGoogleSuggestedLocations,
  }
})()

export default TargetingService
