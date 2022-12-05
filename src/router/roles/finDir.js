export const finDir = [
  {
    path: '/fin-dir/',
    name: 'finDir',
    redirect: '/fin-dir/objects',
    meta: { enableRoles: [0, 1] },
    children: [
      {
        path: 'objects',
        name: 'findDirObjects',
        meta: { enableRoles: [0, 1] },
        component: () => import('@/views/finDir/finDirObjectsView.vue'),
        children: [
          {
            path: 'create',
            name: 'findDirCreateObjects',
            meta: { hideParent: true, enableRoles: [0, 1] },
            component: () => import('@/views/finDir/finDirCreateView.vue')
          },
          {
            path: ':id',
            name: 'findDirObjectsID',
            meta: { hideParent: true, enableRoles: [0, 1] },
            component: () => import('@/views/finDir/finDirObjectIDView.vue')
          }
        ]
      },
      {
        path: 'represent',
        name: 'finDir-Represent',
        meta: { enableRoles: [0, 1] },
        component: () => import('@/views/finDir/finDirRepresentView.vue'),
        children: [
          {
            path: 'add',
            name: 'finDir-RepresentAdd',
            meta: { hideParent: true, enableRoles: [0, 1] },
            component: () => import('@/views/finDir/finDirRepresentAddView.vue')
          },
          {
            path: ':id',
            name: 'finDir-RepresentID',
            meta: { hideParent: true, enableRoles: [0, 1] },
            component: () => import('@/views/finDir/finDirRepresentIDView.vue')
          }
        ]
      }
    ]
  }
]
