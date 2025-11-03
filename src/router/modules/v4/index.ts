import { RouteRecordRaw } from 'vue-router';

export default {
   path: '/',
   name: 'Task',
   component: () => import('@/layout/v4/main.vue'),
   meta: {
      role: ['common', 'admin'],
   },
   children: [
      {
         path: '',
         name: 'TaskPage',
         component: () => import('@/views/nft/index.vue'),
         meta: {
            role: ['common', 'admin'],
         },
      },
   ],
} as RouteRecordRaw;
