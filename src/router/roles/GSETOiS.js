export const GSETOiS = [
  {
    path: '/GSETOiS/',
    name: 'GSETOiS',
    redirect: '/GSETOiS/objects',
    meta: { enableRoles: [0, 14] },
    children: [
      {
        path: 'objects',
        name: 'GSETOiSObjects',
        meta: { enableRoles: [0, 14] },
        component: () => import('@/views/GSETOiS/GSETOiSObjectsView.vue'),
        children: [
          {
            path: ':id',
            name: 'GSETOiSObjectID',
            meta: { hideParent: true, enableRoles: [0, 14] },
            component: () => import('@/views/GSETOiS/GSETOiSObjectIDView.vue')
          }
        ]
      }
    ]
  }
]
