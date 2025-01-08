import API from './api'

const PaymentService = (function () {
  const prefix = 'Clients/'

  // const prefix = "https://test.matrix.sa/Demo/Ads"

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
   

  return {
    get,
    getCreditCards,
    purchaseService,
    getFinancialTransactions
  }
})()

export default PaymentService
