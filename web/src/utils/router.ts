import router from '@/router';
export function backToHome() {
   router.push('/');
}

export function toUrl(path: string, query: any = {}) {
   return router.push({
      path: path,
      query: query
   });
}
