export const ComDir = [
  {
    path: '/ComDir/',
    name: 'ComDir',
    redirect: '/ComDir/objects',
    meta: { enableRoles: [0, 20] },
    children: [
      {
        path: 'objects',
        name: 'ComDirObject',
        meta: { enableRoles: [0, 20] },
        component: () => import('@/views/ComDir/ComDirObjectsView.vue'),
        children: [
          {
            path: ':id',
            name: 'ComDirObjectsID',
            meta: { hideParent: true, enableRoles: [0, 20] },
            component: () => import('@/views/ComDir/ComDirObjectIDView.vue')
          }
        ]
      },
      {
        path: 'notification',
        name: 'ComDirNotification',
        meta: { enableRoles: [0, 20] },
        component: () => import('@/views/ComDir/ComDirNotificationView.vue')
      }
    ]
  }
]
