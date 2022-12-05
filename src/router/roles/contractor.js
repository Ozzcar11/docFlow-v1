export const contractor = [
  {
    path: '/contractor/',
    name: 'contractor',
    redirect: '/contractor/objects',
    meta: { enableRoles: [0, 6] },
    children: [
      {
        path: 'objects',
        name: 'contractorObjects',
        meta: { enableRoles: [0, 6] },
        component: () => import('@/views/contractor/contractorObjectsView.vue'),
        children: [
          {
            path: ':id',
            name: 'contractorObjectsID',
            meta: { hideParent: true, enableRoles: [0, 6] },
            component: () =>
              import('@/views/contractor/contractorObjectIDView.vue')
          }
        ]
      }
    ]
  }
]
