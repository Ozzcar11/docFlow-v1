export const techSupervisor = [
  {
    path: '/tech-supervisor/',
    name: 'techSupervisor',
    redirect: '/tech-supervisor/objects',
    meta: { enableRoles: [0, 12] },
    children: [
      {
        path: 'objects',
        name: 'techSupervisorObjects',
        meta: { enableRoles: [0, 12] },
        component: () =>
          import('@/views/techSupervisor/techSupervisorObjectsView.vue'),
        children: [
          {
            path: ':id',
            name: 'techSupervisorObjectID',
            meta: { hideParent: true, enableRoles: [0, 12] },
            component: () =>
              import('@/views/techSupervisor/techSupervisorObjectIDView.vue')
          }
        ]
      }
    ]
  }
]
