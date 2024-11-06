import API from './api'

const AdsService = (function () {
  const prefix = 'Clients/Ads'

  // const prefix = "https://test.matrix.sa/Demo/Ads"

  const get = params => {
    return API.get(`${prefix}/GetAdsV2`, params)
  }

  const getById = async (platform, params) => {
    return API.get(`${platform}/Ads/GetAd`, params)
  }

  const launch = (platform, data) => {
    return API.post(`${platform}/Ads/CreateAd`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',

        // "Content-Type": "application/x-www-form-urlencoded",
      },
    })
  }

  const pause = (platform, params) => {
    return API.put(`${platform}/Ads/PauseAd`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
  }

  const relaunch = (platform, params) => {
    return API.put(`${platform}/Ads/RelaunchAd`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
  }

  const deleteAd = (platform, params) => {
    return API.delete(`${platform}/Ads/DeleteAd`, params)
  }

  const getSupportedRegions = (platform, CountryCode) => {
    return API.get(`${platform}/Targeting/GetRegions`, { CountryCode })
  }

  const getSupportedCities = (platform, CountryCode, RegionId) => {
    return API.get(`${platform}/Targeting/GetCities`, {
      CountryCode,
      RegionId,
    })
  }

  const getSupportedProvinces = (platform, CountryId) => {
    return API.get(`${platform}/Targeting/GetCountryProvinces`, { CountryId })
  }

  return {
    get,
    getById,
    launch,
    relaunch,
    pause,
    deleteAd,
    getSupportedRegions,
    getSupportedCities,
    getSupportedProvinces,
  }
})()

export default AdsService
