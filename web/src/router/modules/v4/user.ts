import { RouteRecordRaw } from 'vue-router';

export default {
   path: '/user',
   name: 'User',
   component: () => import('@/layout/v4/main.vue'),
   meta: {
      role: ['common', 'admin'],
   },
   children: [
      {
         path: '',
         name: 'UserPage',
         component: () => import('@/views/user/index.vue'),
         meta: {
            role: ['common', 'admin'],
         },
      },
   ],
} as RouteRecordRaw;
