export const techService = [
  {
    path: '/techService/',
    name: 'techService',
    redirect: '/techService/objects',
    meta: { enableRoles: [0, 9] },
    children: [
      {
        path: 'objects',
        name: 'techServiceObjects',
        meta: { enableRoles: [0, 9] },
        component: () => import('@/views/techService/techServiceObjectsView.vue'),
        children: [
          {
            path: ':id',
            name: 'techServiceObjectID',
            meta: { hideParent: true, enableRoles: [0, 9] },
            component: () => import('@/views/techService/techServiceObjectIDView.vue')
          }
        ]
      }
    ]
  }
]
