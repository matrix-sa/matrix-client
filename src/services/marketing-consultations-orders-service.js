import API from "./api"

const MarketingConsultationsOrdersService = (function () {
  const prefix = "Clients/MarketingConsultationsOrders"

  const getAll = params => {
    return API.get(`${prefix}/GetOrders`, params, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  const getById = params => {
    return API.get(`${prefix}/GetOrderDetails`, params, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  const create = data => {
    return API.post(`${prefix}/CreateOrder`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  const payOrder = data => {
    return API.put(`${prefix}/PayOrder`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  return {
    getAll,
    getById,
    create,
    payOrder,
  }
})()

export default MarketingConsultationsOrdersService
