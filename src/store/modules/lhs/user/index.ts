import { defineStore } from 'pinia';
import { UserState } from './types';
import pinia from '@/store';
import { userLoginByPhantom, userLoginByWeb3auth, getMemberInfo, checkLogin } from '@/api/lhs/login';
import { userLoginByLocalEmailCode } from '@/api/lhs/user';
import router from '@/router';

export const useUserStore = defineStore(
   // 唯一ID
   'web3user',
   {
      state: () => ({
         username: '游客',
         accessToken: '',
         roles: ['common'],
         info: {
            nickname: '',
            username: '',
            headimg: '',
            pid: 0
         },
      }),
      getters: {},
      actions: {
         updateInfo(partial: Partial<UserState>) {
            this.$patch(partial);
         },
         // 用户登录
         storeUserLoginByPhantom(data) {
            return userLoginByPhantom(data).then(async (res) => {
               //this.roles = res.roles;
               this.username = res.token;
               this.accessToken = res.token;
               localStorage.setItem('lhs-api-token', res.token);
               localStorage.removeItem('shareCode');
               await this.getMemberInfo();
               return res;
            });
         },
         storeUserLoginByWeb3auth(data) {
            return userLoginByWeb3auth(data).then(async (res) => {
               //this.roles = res.roles;
               this.username = res.token;
               this.accessToken = res.token;
               localStorage.setItem('lhs-api-token', res.token);
               localStorage.removeItem('shareCode');
               await this.getMemberInfo();
               return res;
            });
         },
         storeUserLoginByLocalEmailCode(data) {
            return userLoginByLocalEmailCode(data).then(async (res) => {
               //this.roles = res.roles;
               this.username = res.token;
               this.accessToken = res.token;
               localStorage.setItem('lhs-api-token', res.token);
               localStorage.removeItem('shareCode');
               await this.getMemberInfo();
               return res;
            });
         },
         async getMemberInfo() {
            if (!this.accessToken) return
            await getMemberInfo()
               .then((res: any) => {
                  this.info = res
               })
               .catch((err) => {
                  console.log(err)
                  this.logoutNotHref()
               })
         },
         // 刷新用户信息
         refreshUserInfo() {
            checkLogin({
               token: this.accessToken,
            })
               .then((res) => {
                  if (res.code === 1) {

                  } else {
                     this.logoutNotHref()
                  }
               })
               .catch(() => {
                  this.logoutNotHref()
               });
         },
         // 判断用户是否登录
         isLogin(): boolean {
            var token = localStorage.getItem('lhs-api-token')
            if (token == this.accessToken) {
               return true;
            }
            return false;
         },
         // 验证用户身份
         authStatus(allowStatus: Array<string>): boolean {
            for (const role of this.roles) {
               if (allowStatus.includes(role)) return true;
            }
            return false;
         },
         logoutNotHref() {
            this.username = '游客';
            this.accessToken = '';
            this.roles = [''];
            this.info = {
               username: '',
               nickname: '',
               headimg: '',
               pid: 0
            };
            localStorage.removeItem('lhs-api-token')
         },
         // 退出登录
         logOut() {
            this.logoutNotHref()
            router.push('/login');
         },
      },
      // persist: {
      //    key: 'web3user',
      //    storage: sessionStorage,
      //    paths: ['accessToken'],
      // },
      persist: true,
   }
);

export function useUserStoreHook() {
   return useUserStore(pinia);
}
