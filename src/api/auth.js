import { DefaultAPIInstance } from '../utils/axios'

export const AuthAPI = {
//   sendTelephone(body) {
//     return DefaultAPIInstance.post('/get_code/', body)
//   },
//   getToken(body) {
//     return DefaultAPIInstance.post('/login/', body)
//   },
  refreshToken() {
    return DefaultAPIInstance.get('/token/refresh/')
  },
  getToken(body) {
   return DefaultAPIInstance.post('/login/', body)
  }
}
