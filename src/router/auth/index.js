export const auth = [
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'EmptyLayout', enableRoles: 'all' },
    component: () => import('@/views/LoginView.vue')
  }
]
