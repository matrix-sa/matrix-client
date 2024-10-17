import API from "./api"

const DashboardGraphsService = (function () {

  const prefix = `Clients/Statistics`


  const get = () => {
    return API.get(`${prefix}/GetDashboardStatistics`)
  }



  return {
    get,
  }
})()

export default DashboardGraphsService
