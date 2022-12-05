export const PTO = [
  {
    path: '/PTO/',
    name: 'PTO',
    redirect: '/PTO/objects',
    meta: { enableRoles: [0, 17] },
    children: [
      {
        path: 'objects',
        name: 'PTOObjects',
        meta: { enableRoles: [0, 17] },
        component: () => import('@/views/PTO/PTOObjectsView.vue'),
        children: [
          {
            path: ':id',
            name: 'PTOObjectID',
            meta: { hideParent: true, enableRoles: [0, 17] },
            component: () => import('@/views/PTO/PTOObjectIDView.vue')
          }
        ]
      }
    ]
  }
]
