import { post, get } from '@/utils/http';

export const userLoginByWeb3auth = async (data) => {
   return post({}, '/api/web3auth/login/token', data);
};

export const userLoginByPhantom = async (data) => {
   return post({}, '/api/lhs/user/validate-token', data);
};

export const refreshUserInfo = async (data) => {
   //return post({}, '/kkkkk/getUserInfo', data);
   console.log(data);
};

export function getMemberInfo() {
   return get({}, '/api/member/member');
}

export const checkLogin = async (data) => {
   return get({}, '/api/web3auth/user/check-login', data);
};