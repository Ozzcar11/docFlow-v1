export const GD = [
  {
    path: '/GD/',
    name: 'GD',
    redirect: '/GD/objects',
    meta: { enableRoles: [0, 2] },
    children: [
      {
        path: 'objects',
        name: 'GDObjects',
        meta: { enableRoles: [0, 2] },
        component: () => import('@/views/GD/GDObjectsView.vue'),
        children: [
          {
            path: ':id',
            name: 'GDObjectID',
            meta: { enableRoles: [0, 2], hideParent: true },
            component: () => import('@/views/GD/GDObjectIDView.vue')
          }
        ]
      },
      {
        path: 'notification',
        name: 'GDNotif',
        meta: { enableRoles: [0, 2] },
        component: () =>
          import('@/views/GD/GDNotificationView.vue')
      }
    ]
  }
]
