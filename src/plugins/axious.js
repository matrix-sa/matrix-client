import router from '@/router'
import axios from 'axios'
import { useAuthStore } from '@/stores/useAuthStore'
import i18n from '@/i18n'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: 'https://matrix.sa',
  // baseURL: 'https://matrix.sa',

  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

// ℹ️ Add request interceptor to send the authorization header on each subsequent request after login
axiosIns.interceptors.request.use(config => {
  const authStore = useAuthStore()

  // Retrieve token from localStorage
  const token = authStore.token

  // If token is found
  if (token) {
    // Get request headers and if headers is undefined assign blank object
    config.headers = config.headers || {}

    try {
      config.headers.Authorization = token ? `Bearer ${token}` : ''
    } catch (e) {
      localStorage.removeItem('accessToken')
      authStore.token = ''
    }

    // Set authorization header
    // ℹ️ JSON.parse will convert token to string
  }

  // Add the language header
  config.headers['x-app-language'] = i18n.global.locale.value

  // Return modified config
  return config
})

// ℹ️ Add response interceptor to handle 401 response
axiosIns.interceptors.response.use(
  response => {
    return response
  },
  error => {
    // Handle error
    if (error.response?.status === 401) {
      // ℹ️ Logout user and redirect to login page
      // Remove "userData" from localStorage
      localStorage.removeItem('userData')

      // Remove "accessToken" from localStorage
      localStorage.removeItem('accessToken')

      // localStorage.removeItem('userAbilities')

      // If 401 response returned from api
      if (window.location.href.includes('/auth/')) return

      window.location.href = '/auth/'
    } else {
      return Promise.reject(error)
    }
  }
)
export default axiosIns
