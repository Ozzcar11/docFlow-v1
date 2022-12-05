export const engineer = [
  {
    path: '/engineer/',
    name: 'engineer',
    redirect: '/engineer/objects',
    meta: { enableRoles: [0, 5] },
    children: [
      {
        path: 'objects',
        name: 'engineerObjects',
        meta: { enableRoles: [0, 5] },
        component: () => import('@/views/engineer/EngineerObjectsView.vue'),
        children: [
          {
            path: ':id',
            name: 'engineerObjectsID',
            meta: { hideParent: true, enableRoles: [0, 5] },
            component: () => import('@/views/engineer/EngineerObjectIDView.vue')
          }
        ]
      }
    ]
  }
]
