import { DefaultAPIInstance } from '../utils/axios'

export const RepresentAPI = {
  createRepresent(body) {
    return DefaultAPIInstance.post('/create_list_representative/', body)
  },
  requestRepresents() {
    return DefaultAPIInstance.get('/create_list_representative/')
  },
  requestRepresent(id) {
    return DefaultAPIInstance.get(`/edit_representative/${id}/`)
  },
  changeRepresent(id, body) {
    return DefaultAPIInstance.get(`/edit_representative/${id}/`, body)
  }
}
