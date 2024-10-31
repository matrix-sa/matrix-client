import API from './api'

const CurrenciesService = (function () {
  const prefix = `Clients/Account`

  const getSupportedCurrencies = () => {
    return API.get(`${prefix}/GetSupportedCurrencies`, {})
  }

  return {
    getSupportedCurrencies,
  }
})()

export default CurrenciesService
