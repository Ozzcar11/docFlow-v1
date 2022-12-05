import { AuthAPI } from '@/api/auth'
import { DefaultAPIInstance } from '@/utils/axios'
import jwt_decode from 'jwt-decode'

export const AuthModule = {
  state() {
    return {
      credentials: {
        accessToken: localStorage.getItem('accessToken') || null,
        refreshToken: localStorage.getItem('refreshToken') || null,
        userRole: localStorage.getItem('userRole') || null
      },
      roles: [
        'admin',
        'fin-dir',
        'GD',
        'viceGD-s1',
        'PKO',
        'engineer',
        'contractor',
        'lawyer',
        'GEE',
        'TechService',
        'surveyor',
        'logistician',
        'tech-supervisor',
        'viceGD-exp',
        'GSETOiS',
        'ESETOiS',
        'DS',
        'PTO',
        'accounting'
      ]
    }
  },
  getters: {
    getUserRoute: (state) => {
      return state.roles[state.credentials.userRole]
    },
    getUserRole: (state) => {
      return state.credentials.userRole
    }
  },

  mutations: {
    setAccessToken(state, token) {
      state.credentials.accessToken = token
      localStorage.setItem('accessToken', token)
    },
    setRefreshToken(state, token) {
      state.credentials.refreshToken = token
      localStorage.setItem('refreshToken', token)
    },
    setRole(state, role) {
      state.credentials.userRole = role
      localStorage.setItem('userRole', role)
    },
    refreshToken({ commit }, token) {
      commit('setAccessToken', token)
      localStorage.setItem('TTEtoken', jwt_decode(token).exp)
      DefaultAPIInstance.headers['authorization'] = `Bearer ${token}`
    },
    deleteAccessToken(state) {
      state.credentials.accessToken = null
      localStorage.removeItem('accessToken')
    },
    deleteRefreshToken(state) {
      state.credentials.refreshToken = null
      localStorage.removeItem('refreshToken')
    },
    deleteUserRole(state) {
      state.credentials.userRole = null
      localStorage.removeItem('userRole')
    }
  },
  actions: {
    async onLogin({ commit }, body) {
      const res = await AuthAPI.getToken(body)
      localStorage.setItem('TTEtoken', jwt_decode(res.data.access).exp)
      commit('setAccessToken', res.data.access)
      commit('setRefreshToken', res.data.refresh)
      commit('setRole', res.data.roles)
    },
    async onLogout({ commit }) {
      commit('setAccessToken')
      commit('setRefreshToken')
      commit('deleteAccessToken')
      commit('deleteRefreshToken')
      commit('deleteUserRole')
      localStorage.removeItem('TTEtoken')
      delete DefaultAPIInstance.defaults.headers['authorization']
    }
  }
}
