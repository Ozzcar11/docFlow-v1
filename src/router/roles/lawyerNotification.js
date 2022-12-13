export const lawyerNotification = [
  {
    path: '/lawyerNotification/',
    name: 'lawyerNotification',
    redirect: '/lawyerNotification/objects',
    meta: { enableRoles: [0, 21] },
    children: [
      {
        path: 'objects',
        name: 'lawyerNotificationObject',
        meta: { enableRoles: [0, 21] },
        component: () =>
          import(
            '@/views/lawyerNotification/LawyerNotificationObjectsView.vue'
          ),
        children: [
          {
            path: ':id',
            name: 'lawyerNotificationObjectsID',
            meta: { hideParent: true, enableRoles: [0, 21] },
            component: () =>
              import(
                '@/views/lawyerNotification/LawyerNotificationObjectIDView.vue'
              )
          }
        ]
      },
      {
        path: 'notification',
        name: 'lawyerNotificationNotif',
        meta: { enableRoles: [0, 21] },
        component: () =>
          import('@/views/lawyerNotification/LawyerNotificationView.vue')
      }
    ]
  }
]
