import API from './api'

const ReportsService = (function () {
  const prefix = `Clients/Statistics`

  const get = () => {
    return API.get(`${prefix}/GetReportsStatistics`)
  }

  return {
    get,
  }
})()

export default ReportsService
