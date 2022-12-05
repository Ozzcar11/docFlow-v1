export const accounting = [
  {
    path: '/accounting/',
    name: 'accounting',
    redirect: '/accounting/objects',
    meta: { enableRoles: [0, 18] },
    children: [
      {
        path: 'objects',
        name: 'accountingObjects',
        meta: { enableRoles: [0, 18] },
        component: () => import('@/views/accounting/accountingObjectsView.vue'),
        children: [
          {
            path: ':id',
            name: 'accountingObjectID',
            meta: { hideParent: true, enableRoles: [0, 18] },
            component: () =>
              import('@/views/accounting/accountingObjectIDView.vue')
          }
        ]
      }
    ]
  }
]
