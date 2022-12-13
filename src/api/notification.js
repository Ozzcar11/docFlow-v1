import { DefaultAPIInstance } from '../utils/axios'

export const NotificationAPI = {
  createNotification(body) {
    return DefaultAPIInstance.post(`/create_notifications/`, body)
  },
  getNotifications(id) {
    return DefaultAPIInstance.get(`list_user_notifications/?id=${id}`)
  }
}
