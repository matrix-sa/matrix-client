import API from './api'

const CreditCardService = (function () {
  // Create tracking ad
  const AddCreditCard = data => {
    return API.post(`Clients/CreditCards/StartAddCreditCard`, data, {
      headers: {
        'Content-Type': 'application/json',
      },

    })
  }

  return {
    AddCreditCard,
  }
})()

export default CreditCardService
