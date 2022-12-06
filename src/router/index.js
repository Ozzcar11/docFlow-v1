import { createRouter, createWebHistory } from 'vue-router'
import { roles } from './roles'
import { auth } from './auth'
import store from '../store'

const routes = [...auth, ...roles]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthorized = Object.prototype.hasOwnProperty.call(
    localStorage,
    'accessToken'
  )

  if (
    (isAuthorized &&
      to.meta.enableRoles?.includes(+store.getters.getUserRole)) ||
    to.path === '/login'
  )
    next()
  else {
    store.dispatch('onLogout')
    next('/login')
  }
})

export default router
