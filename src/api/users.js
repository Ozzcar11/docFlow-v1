import { DefaultAPIInstance } from '../utils/axios'

export const UsersAPI = {
  createUser(body) {
    return DefaultAPIInstance.post('/create_user/', body)
  },
  changeUser(id, body) {
    return DefaultAPIInstance.put(`/detail_user/${id}/`, body)
  },
  requestUsers() {
    return DefaultAPIInstance.get('/list_user/')
  },
  detailUser(body) {
    return DefaultAPIInstance.get(`/detail_user/${body}/`)
  },
  deleteUser(body) {
    return DefaultAPIInstance.delete(`/detail_user/${body}/`)
  },
  profileUser(profile) {
    return DefaultAPIInstance.get(`/LIST/?who=${profile}`)
  },
  listRoles() {
   return DefaultAPIInstance.get(`/list_roles`)
  },
  newPass(id, body){
   return DefaultAPIInstance.put(`/new_password/${id}/`, body)
  }
}
