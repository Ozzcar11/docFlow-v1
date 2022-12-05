export const logistician = [
  {
    path: '/logistician/',
    name: 'logistician',
    redirect: '/logistician/objects',
    meta: { enableRoles: [0, 11] },
    children: [
      {
        path: 'objects',
        name: 'logisticianObject',
        meta: { enableRoles: [0, 11] },
        component: () =>
          import('@/views/logistician/logisticianObjectsView.vue'),
        children: [
          {
            path: ':id',
            name: 'logisticianObjectsID',
            meta: { hideParent: true, enableRoles: [0, 11] },
            component: () =>
              import('@/views/logistician/logisticianObjectIDView.vue')
          }
        ]
      }
    ]
  }
]
