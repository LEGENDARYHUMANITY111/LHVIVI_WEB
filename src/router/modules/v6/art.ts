import { RouteRecordRaw } from 'vue-router';

export default {
   path: '/art',
   name: 'Art',
   component: () => import('@/layout/v5/main.vue'),
   meta: {
      role: ['common', 'admin'],
   },
   children: [
      {
         path: '',
         name: 'ArtPage',
         component: () => import('@/views/v5/index/art.vue'),
         meta: {
            role: ['common', 'admin'],
         },
      },
   ],
} as RouteRecordRaw;
