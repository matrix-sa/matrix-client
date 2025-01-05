import API from './api'

const CreditCardService = (function () {
  const prefix = 'Clients/CreditCards'

  const AddCreditCard = data => {
    return API.post(`${prefix}/StartAddCreditCard`, data)
  }

  const GetCreditCards = () => {
    return API.get(`${prefix}/GetAll`)
  }

  return {
    AddCreditCard,
    GetCreditCards,
  }
})()

export default CreditCardService
