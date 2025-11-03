import { RouteRecordRaw } from 'vue-router';

export default {
   path: '/twitter',
   name: 'Twitter',
   component: () => import('@/layout/v4/main.vue'),
   meta: {
      role: ['common', 'admin'],
   },
   children: [
      {
         path: '',
         name: 'TwitterPage',
         component: () => import('@/views/twitter/index.vue'),
         meta: {
            role: ['common', 'admin'],
         },
      },
   ],
} as RouteRecordRaw;
