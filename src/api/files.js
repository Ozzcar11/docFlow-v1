import { DefaultAPIInstance } from '../utils/axios'

export const FilesAPI = {
  sendRegularFileObject(id, body) {
    return DefaultAPIInstance.post(`/add_regular_file/?id=${id}`, body)
  },
  sendPriorityFileObject(id, body) {
    return DefaultAPIInstance.post(`/add_priority_file/?id=${id}`, body)
  },
  getPriorityFilesObject(id) {
    return DefaultAPIInstance.get(`/add_priority_file/?id=${id}`)
  },
  getRegularFilesObject(id) {
    return DefaultAPIInstance.get(`/add_regular_file/?id=${id}`)
  }
}
