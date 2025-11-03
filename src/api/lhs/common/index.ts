import { get, post } from '@/utils/http';
import { MyInvicationPageList } from '@/api/lhs/user/types';

export const getState = async (data) => {
   return get({}, '/api/lhs/common/stat', data);
};

export function doCheckIn(data) {
   return get({}, '/api/lhs/user/check-in', data);
}

// export const doTwiiterFollow = async (data) => {
//    return post({}, '/api/lhs/common/twitter-follow', data);
// };

// export const getOpenTwitterWindownUrl = async (data) => {
//    return get({}, '/api/lhs/common/open-twitter-window', data);
// };


export const queryIsAuth = async (data) => {
   return get({}, '/api/lhs/twitter/is-auth', data);
};

export const doTwitterTask = async (data) => {
   return post({}, '/api/lhs/twitter/do-task', data);
};

export const doClickUrlTask = async (data) => {
   return post({}, '/api/lhs/task/click-url', data);
};

export const getTwitterOauthUrl = async (data) => {
   return get({}, '/api/lhs/twitter/get-oauth-jump-url', data);
};

export const getTwitterOauthToken = async (data) => {
   return get({}, '/api/lhs/twitter/get-oauth-token', data);
};

export const getLeaderboard = async (data) => {
   return get<MyInvicationPageList>({}, '/api/web3auth/user/get-leaderboard', data);
};

export const getLastJoinMember = async (data) => {
   return get<MyInvicationPageList>({}, '/api/web3auth/user/get-last-join-member', data);
};

export const refreshSysConfig = async () => {
   return get({}, '/api/lhs/config/index', {});
};