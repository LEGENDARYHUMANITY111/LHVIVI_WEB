import { RouteRecordRaw } from 'vue-router';

export default {
   path: '/order',
   name: 'Order',
   component: () => import('@/layout/v6/main.vue'),
   meta: {
      role: ['common', 'admin'],
   },
   children: [
      {
         path: '',
         name: 'OrderPage',
         component: () => import('@/views/v6/user/order.vue'),
         meta: {
            role: ['common', 'admin'],
         },
      },
   ],
} as RouteRecordRaw;
