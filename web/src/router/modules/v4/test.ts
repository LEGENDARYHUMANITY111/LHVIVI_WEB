import { RouteRecordRaw } from 'vue-router';

export default {
   path: '/test',
   name: 'Test',
   component: () => import('@/views/test/index.vue'),
   meta: {
      role: ['common', 'admin'],
   },
   // children: [
   //    {
   //       path: '',
   //       name: 'testPage',
   //       component: () => import('@/views/test/index.vue'),
   //       meta: {
   //          role: ['common', 'admin'],
   //       },
   //    },
   // ],
} as RouteRecordRaw;
