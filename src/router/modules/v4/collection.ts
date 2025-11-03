import { RouteRecordRaw } from 'vue-router';

export default {
   path: '/collection',
   name: 'Collection',
   component: () => import('@/layout/v4/main.vue'),
   meta: {
      role: ['common', 'admin'],
   },
   children: [
      {
         path: '',
         name: 'CollectionlPage',
         component: () => import('@/views/nft/collection.vue'),
         meta: {
            role: ['common', 'admin'],
         },
      },
   ],
} as RouteRecordRaw;
