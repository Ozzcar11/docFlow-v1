export const viceGD = [
  {
    path: '/viceGD-s1/',
    name: 'viceGD-s1',
    redirect: '/viceGD-s1/objects',
    meta: { enableRoles: [0, 3] },
    children: [
      {
        path: 'objects',
        name: 'ViceGD-s1Objects',
        meta: { enableRoles: [0, 3] },
        component: () => import('@/views/ViceGD/ViceGDObjectsView.vue'),
        children: [
          {
            path: ':id',
            name: 'ViceGDObjectID',
            meta: { enableRoles: [0, 3], hideParent: true },
            component: () => import('@/views/ViceGD/ViceGDObjectIDView.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/viceGD-exp/',
    name: 'viceGD-exp',
    redirect: '/viceGD-exp/objects',
    meta: { enableRoles: [0, 13] },
    children: [
      {
        path: 'objects',
        name: 'ViceGD-expObjects',
        meta: { enableRoles: [0, 13] },
        component: () => import('@/views/ViceGD/ViceGDexpObjectsView.vue'),
        children: [
          {
            path: ':id',
            name: 'ViceGDexpObjectID',
            meta: { enableRoles: [0, 13], hideParent: true },
            component: () => import('@/views/ViceGD/ViceGDexpObjectIDView.vue')
          }
        ]
      }
    ]
  }
]
