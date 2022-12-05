import { DefaultAPIInstance } from '../utils/axios'

export const ObjectAPI = {
  createObject(body) {
    return DefaultAPIInstance.post('/create_list_object/', body)
  },
  editObject(id, body) {
    return DefaultAPIInstance.put(`/edit_object/${id}/`, body)
  },
  requestObject(id) {
    return DefaultAPIInstance.get(`/detail_object/${id}/`)
  },
  nextObject(id, body) {
    return DefaultAPIInstance.put(`/detail_object/${id}/`, body)
  },
  requestObjects() {
    return DefaultAPIInstance.get(`/create_list_object/`)
  },
  requestComments(id) {
    return DefaultAPIInstance.get(`/list_object_comment/${id}`)
  },
  addComment(body) {
    return DefaultAPIInstance.post(`/add_comments/`, body)
  },
  requestLogs(id) {
    return DefaultAPIInstance.get(`/logi/?id=${id}`)
  },
  searchObject(body) {
    return DefaultAPIInstance.post(`/search_material_1S/`, body)
  },
  materialsObject(body) {
    return DefaultAPIInstance.post(`/add_material_in_object/`, body)
  },
  checkObject(body) {
    return DefaultAPIInstance.post(`add_list_material_in_1S/${body}/`)
  },
  getMaterialsObject(body) {
    return DefaultAPIInstance.get(`list_material_in_object/${body}/`)
  }
}
