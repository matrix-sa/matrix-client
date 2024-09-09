import API from './api'

const AuthService = (function () {
  const prefix = 'Clients/Account'

  const login = async data => {
    return API.post(`${prefix}/login`, data)
  }

  const verifyMobile = async data => API.post(`${prefix}/Verification`, data)

  const me = () => {
    return API.get(`${prefix}/index`, {})
  }

  const register = async data => {
    return API.post(`${prefix}/SignUp`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  const updateProfile = data => {
    return API.put(`${prefix}/UpdateProfile`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  const resetPassword = data => {
    return API.post(`${prefix}/ResetPassword`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  return {
    login,
    me,
    register,
    verifyMobile,
    updateProfile,
    resetPassword,
  }
})()

export default AuthService
