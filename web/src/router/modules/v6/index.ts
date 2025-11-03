import { RouteRecordRaw } from 'vue-router';

export default {
   path: '/',
   name: 'Task',
   component: () => import('@/layout/v6/main.vue'),
   meta: {
      role: ['common', 'admin'],
   },
   children: [
      {
         path: '',
         name: 'TaskPage',
         component: () => import('@/views/v6/index/index.vue'),
         meta: {
            role: ['common', 'admin'],
         },
      },
   ],
} as RouteRecordRaw;
