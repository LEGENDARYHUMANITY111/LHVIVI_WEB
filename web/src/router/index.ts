import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useUserStoreHook } from '@/store/modules/lhs/user';
import { useSysConfigStoreHook } from '@/store/modules/lhs/config';

const modules: Record<string, any> = import.meta.glob(['./modules/v6/*.ts'], {
   eager: true,
});
const routes: Array<RouteRecordRaw> = [];

// 自动导入全部路由
Object.keys(modules).forEach((key) => {
   routes.push(modules[key].default);
});

//导入生成的路由数据
const router = createRouter({
   //history: createWebHistory('/web/'),
   history: createWebHistory('/'),
   routes,
});

const noStatusPage = ['/twitter', '/', '/detail', '/test', '/result', '/art'];
router.beforeEach(async (_to, _from, next) => {
   document.body.scrollTop = 0;
   document.documentElement.scrollTop = 0;
   NProgress.start();

   const useSysConfig = useSysConfigStoreHook();
   await useSysConfig.refreshConfig();

   const userStore = useUserStoreHook();
   await userStore.refreshUserInfo();
   const userIsLogin = userStore.isLogin();
   if (userIsLogin || noStatusPage.includes(_to.path)) {
      next()
   } else {
      next('/')
      //next()
   }
});

router.afterEach((_to) => {
   NProgress.done();
});

export default router;
