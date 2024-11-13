import API from './api'

const TrackingService = (function () {
  // Create tracking ad
  const createTrackingAd = (platform, data) => {
    return API.post(`${platform}/Ads/CreateTrackingAd`, data, {
      headers: {
        'Content-Type': 'application/json',
      },

    })
  }

  return {
    createTrackingAd,
  }
})()

export default TrackingService
