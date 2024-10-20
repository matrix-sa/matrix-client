import API from "./api"

const MarketingConsultationsService = (function () {
  const prefix = "Clients/MarketingConsultations"

  const getAll = params => {
    return API.get(`${prefix}/GetMarketingConsultations`, params, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  return {
    getAll,
  }
})()

export default MarketingConsultationsService
