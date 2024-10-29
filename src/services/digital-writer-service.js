import API from './api'

const DigitalWriterService = (function () {
  const run = data => {
    return API.post(`/Clients/DigitalWriter/RequestService`, data)
  }

  const getConversations = async () => {
    return API.get(`/Clients/DigitalWriter/GetConversations`)
  }

  const getConversationById = async params => {
    return API.get(`/Clients/DigitalWriter/GetConversation`, params)
  }


    const askQuestion = async data => {
    return API.put(`/Clients/DigitalWriter/Ask`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  return {
    run,
    getConversations,
    getConversationById,
    askQuestion
  }
})()

export default DigitalWriterService
