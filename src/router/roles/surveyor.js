export const surveyor = [
  {
    path: '/surveyor/',
    name: 'surveyor',
    redirect: '/surveyor/objects',
    meta: { enableRoles: [0, 10] },
    children: [
      {
        path: 'objects',
        name: 'surveyorObjects',
        meta: { enableRoles: [0, 10] },
        component: () => import('@/views/surveyor/surveyorObjectsView.vue'),
        children: [
          {
            path: ':id',
            name: 'surveyorObjectID',
            meta: { hideParent: true, enableRoles: [0, 10] },
            component: () => import('@/views/surveyor/surveyorObjectIDView.vue')
          }
        ]
      }
    ]
  }
]
