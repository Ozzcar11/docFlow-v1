export const ESETOiS = [
  {
    path: '/ESETOiS/',
    name: 'ESETOiS',
    redirect: '/ESETOiS/objects',
    meta: { enableRoles: [0, 15] },
    children: [
      {
        path: 'objects',
        name: 'ESETOiSObjects',
        meta: { enableRoles: [0, 15] },
        component: () => import('@/views/ESETOiS/ESETOiSObjectsView.vue'),
        children: [
          {
            path: ':id',
            name: 'ESETOiSObjectID',
            meta: { hideParent: true, enableRoles: [0, 15] },
            component: () => import('@/views/ESETOiS/ESETOiSObjectIDView.vue')
          }
        ]
      }
    ]
  }
]
