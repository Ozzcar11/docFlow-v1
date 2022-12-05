export const admin = [
  {
    path: '/admin/',
    name: 'admin',
    redirect: '/admin/users',
    children: [
      {
        path: 'users',
        name: 'adminUsers',
        meta: { enableRoles: [0] },
        component: () => import('@/views/Admin/AdminUsersView.vue'),
        children: [
          {
            path: 'add',
            name: 'addUser',
            meta: { hiddenView: true, adminPanel: true, enableRoles: [0] },
            component: () => import('@/views/Admin/AdminAddView.vue')
          },
          {
            path: ':id',
            name: 'adminUser',
            meta: { hiddenView: true, adminPanel: true, enableRoles: [0] },
            component: () => import('@/views/Admin/AdminUserView.vue')
          }
        ]
      },
      {
        path: 'CStock',
        name: 'adminCStock',
        meta: { enableRoles: [0] },
        component: () => import('@/views/Admin/AdminCStockView.vue')
      }
    ]
  }
]
