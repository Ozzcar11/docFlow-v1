export const GEE = [
  {
    path: '/GEE/',
    name: 'GEE',
    redirect: '/GEE/objects',
    meta: { enableRoles: [0, 8] },
    children: [
      {
        path: 'objects',
        name: 'GEEObjects',
        meta: { enableRoles: [0, 8] },
        component: () => import('@/views/GEE/GEEObjectsView.vue'),
        children: [
          {
            path: ':id',
            name: 'GEEObjectID',
            meta: { hideParent: true, enableRoles: [0, 8] },
            component: () => import('@/views/GEE/GEEObjectIDView.vue')
          }
        ]
      }
    ]
  }
]
