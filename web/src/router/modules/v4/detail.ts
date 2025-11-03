import { RouteRecordRaw } from 'vue-router';

export default {
   path: '/detail',
   name: 'Detail',
   component: () => import('@/layout/v4/main.vue'),
   meta: {
      role: ['common', 'admin'],
   },
   children: [
      {
         path: '',
         name: 'DetailPage',
         component: () => import('@/views/nft/detail.vue'),
         meta: {
            role: ['common', 'admin'],
         },
      },
   ],
} as RouteRecordRaw;
