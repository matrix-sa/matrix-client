import API from "./api"

const DigitalWriterService = (function () {

  const run = (data) => {
    return API.post(`/Clients/DigitalWriter/RequestService`, data)
  }

  return {
    run,
  }
})()

export default DigitalWriterService
