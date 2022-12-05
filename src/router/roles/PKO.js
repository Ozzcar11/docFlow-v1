export const PKO = [
  {
    path: '/PKO/',
    name: 'PKO',
    redirect: '/PKO/objects',
    meta: { enableRoles: [0, 4] },
    children: [
      {
        path: 'objects',
        name: 'PKOObjects',
        meta: { enableRoles: [0, 4] },
        component: () => import('@/views/PKO/PKOObjectsView.vue'),
        children: [
          {
            path: ':id',
            name: 'PKOObjectID',
            meta: { enableRoles: [0, 4], hideParent: true },
            component: () => import('@/views/PKO/PKOObjectIDView.vue')
          }
        ]
      }
    ]
  }
]
