import { defineStore } from 'pinia';
import pinia from '@/store';
import { refreshSysConfig } from '@/api/lhs/common';

export const useSysConfig = defineStore(
   // 唯一ID
   'sysConfig',
   {
      state: () => ({
         config: {}
      }),
      getters: {},
      actions: {
         async refreshConfig() {
            await refreshSysConfig()
               .then((res: any) => {
                  this.config = res
               })
               .catch((err) => {
                  console.log(err)
               })
         },
      },
      persist: true
   }
);

export function useSysConfigStoreHook() {
   return useSysConfig(pinia);
}
