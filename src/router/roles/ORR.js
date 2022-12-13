export const ORR = [
  {
    path: '/ORR/',
    name: 'ORR',
    redirect: '/ORR/objects',
    meta: { enableRoles: [0, 19] },
    children: [
      {
        path: 'objects',
        name: 'ORRObject',
        meta: { enableRoles: [0, 19] },
        component: () => import('@/views/ORR/ORRObjectsView.vue'),
        children: [
          {
            path: ':id',
            name: 'ORRObjectsID',
            meta: { hideParent: true, enableRoles: [0, 19] },
            component: () => import('@/views/ORR/ORRObjectIDView.vue')
          }
        ]
      },
      {
        path: 'notification',
        name: 'ORRNotification',
        meta: { enableRoles: [0, 19] },
        component: () => import('@/views/ORR/ORRNotificationView.vue')
      }
    ]
  }
]
