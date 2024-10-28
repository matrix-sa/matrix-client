import API from './api'

const DigitalWriterService = (function () {
  const run = data => {
    return API.post(`/Clients/DigitalWriter/RequestService`, data)
  }

  const getConversations = () => {
    return API.get(`/Clients/DigitalWriter/GetConversations`)
  }

  const getConversationById = async params => {
    return API.get(`/Clients/DigitalWriter/GetConversation`, params)
  }

  return {
    run,
    getConversations,
    getConversationById,
  }
})()

export default DigitalWriterService
