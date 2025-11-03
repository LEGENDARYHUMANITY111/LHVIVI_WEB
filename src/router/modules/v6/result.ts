import { RouteRecordRaw } from 'vue-router';

export default {
   path: '/result',
   name: 'Result',
   component: () => import('@/layout/v5/main.vue'),
   meta: {
      role: ['common', 'admin'],
   },
   children: [
      {
         path: '',
         name: 'ResultPage',
         component: () => import('@/views/v5/pay/result.vue'),
         meta: {
            role: ['common', 'admin'],
         },
      },
   ],
} as RouteRecordRaw;
