import API from './api'

const PaymentService = (function () {
  const prefix = 'Clients/'

  // const prefix = "https://test.matrix.sa/Demo/Ads"

  const get = params => {
    return API.get(`${prefix}ServicesPurchase/GetService?serviceType=WhatsApp`, params)
  }


  return {
    get,

  }
})()

export default PaymentService
