export const lawyer = [
  {
    path: '/lawyer/',
    name: 'lawyer',
    redirect: '/lawyer/objects',
    meta: { enableRoles: [0, 7] },
    children: [
      {
        path: 'objects',
        name: 'lawyerObjects',
        meta: { enableRoles: [0, 7] },
        component: () => import('@/views/Lawyer/LawyerObjectsView.vue'),
        children: [
          {
            path: ':id',
            name: 'lawyerObjectID',
            meta: { hideParent: true, enableRoles: [0, 7] },
            component: () => import('@/views/Lawyer/LawyerObjectIDView.vue')
          }
        ]
      }
    ]
  }
]
