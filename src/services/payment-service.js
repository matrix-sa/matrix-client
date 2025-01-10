import API from './api'

const PaymentService = (function () {
  const prefix = 'Clients/'

  const get = params => {
    return API.get(`${prefix}ServicesPurchase/GetService?serviceType=WhatsApp`, params)
  }

  const getCreditCards = params => {
    return API.get(`${prefix}CreditCards/GetAll`, params)
  }

  const purchaseService = data => {
    return API.post(`${prefix}ServicesPurchase/Purchase`, data)
  }

  const getFinancialTransactions = params => {
    return API.get(`${prefix}Transactions/GetAll`, params)
  }

  const getActiveSubscriptions = params => {
    return API.get(`${prefix}ServicesPurchase/GetRecurringPayments`, params)
  }

  const getLimitServicesQuotas = params => {
    return API.get(`${prefix}ServicesPurchase/GetLimitServiceQuotas`, params)
  }

  const getWalletTransactions = params => {
    return API.get(`${prefix}ServicesPurchase/GetWalletTransactions`, params)
  }

  const chargeWallet = data => {
    return API.post(`${prefix}ServicesPurchase/Purchase`, data)
  }

  return {
    get,
    getCreditCards,
    purchaseService,
    getFinancialTransactions,
    getActiveSubscriptions,
    getLimitServicesQuotas,
    getWalletTransactions,
    chargeWallet,
  }
})()

export default PaymentService
