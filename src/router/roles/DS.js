export const DS = [
  {
    path: '/DS/',
    name: 'DS',
    redirect: '/DS/objects',
    meta: { enableRoles: [0, 16] },
    children: [
      {
        path: 'objects',
        name: 'DSObjects',
        meta: { enableRoles: [0, 16] },
        component: () =>
          import('@/views/DS/DSObjectsView.vue'),
        children: [
          {
            path: ':id',
            name: 'DSObjectID',
            meta: { hideParent: true, enableRoles: [0, 16] },
            component: () =>
              import('@/views/DS/DSObjectIDView.vue')
          }
        ]
      }
    ]
  }
]
