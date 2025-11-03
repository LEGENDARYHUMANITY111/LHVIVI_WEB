import { RouteRecordRaw } from 'vue-router';

export default {
   path: '/user',
   name: 'User',
   component: () => import('@/layout/v6/main.vue'),
   meta: {
      role: ['common', 'admin'],
   },
   children: [
      {
         path: '',
         name: 'UserPage',
         component: () => import('@/views/v6/user/index.vue'),
         meta: {
            role: ['common', 'admin'],
         },
      },
   ],
} as RouteRecordRaw;
