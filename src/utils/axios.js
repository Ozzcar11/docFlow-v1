import axios from 'axios'
import store from '../store'
import { AuthAPI } from '@/api/auth'

const loginConfig = {
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
}

export const DefaultAPIInstance = axios.create(loginConfig)

DefaultAPIInstance.interceptors.request.use(async (config) => {
  const TTEtoken = localStorage.getItem('TTEtoken')
  if (TTEtoken) {
    if (new Date().getTime() / 1000 > TTEtoken) {
      const res = await AuthAPI.refreshToken()
      store.commit('refreshToken', res.data.access)
    }
  }

  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) config.headers['authorization'] = `Bearer ${accessToken}`

  return config
})

DefaultAPIInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    console.log(error)
    if (error.code === 401 && !originalRequest._retry) {
      const res = await AuthAPI.refreshToken()
      originalRequest._retry = true
      store.commit('refreshToken', res.data.access)
      return axios(originalRequest)
    }
    return Promise.reject(error)
  }
)
