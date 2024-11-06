import API from './api'

const NotificationsService = (function () {
  const prefix = 'Clients/Notifications'

  const get = params => {
    return API.get(`${prefix}/GetNotifications`, params)
  }

  const getUnreadCount = params => {
    return API.get(`${prefix}/GetUnReadNotificationsCount`, params)
  }

  const markAsRead = data => {
    return API.put(`${prefix}/MarkNotificationRead`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  const markAllAsRead = data => {
    return API.put(`${prefix}/MarkAllNotificationsRead`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  return {
    get,
    getUnreadCount,
    markAsRead,
    markAllAsRead,
  }
})()

export default NotificationsService
