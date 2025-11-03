import { get, post } from '@/utils/http';
import { TaskListPageList, MyInvicationPageList, InvateCode } from '@/api/lhs/user/types';

export const getAssets = async (data) => {
   return get({}, '/api/lhs/user/assets', data);
};

export const getNotification = async (data) => {
   return get({}, '/api/lhs/user/get-notification', data);
};

export const getMyLevel = async (data) => {
   return get({}, '/api/lhs/user/my-level', data);
};

export const modifyInvitation = async (data) => {
   return post({}, '/api/web3auth/user/invite', data);
};

export const getMyParentInvateCode = async (data) => {
   return get({}, '/api/web3auth/user/my-parent-code', data);
};

export const getMyActivityRewardList = async (data) => {
   return get<TaskListPageList>({}, '/api/lhs/activites/get-my-activity-reward-list', data);
};

export const getInvicationList = async (data) => {
   return get<MyInvicationPageList>({}, '/api/web3auth/user/my-invication-list', data);
};

export const modifyMember = async (data) => {
   return post({}, '/api/web3auth/user/modify-member', data);
};

export const getMyInvateCodeList = async (data) => {
   return get<InvateCode[]>({}, '/api/lhs/user/get-my-invate-code-list', data);
};

export const getNonceCode = async (data) => {
   return get({}, '/api/lhs/user/get-nonce-code', data);
};

export const validateToken = async (data) => {
   return post({}, '/api/lhs/user/validate-token', data);
};


export const checkInvationCodeAvailable = async (data) => {
   return get({}, '/api/web3auth/user/invation-code-available', data);
};

export const getMemberExtend = async (data) => {
   return get({}, '/api/web3auth/user/extend', data);
};

export const applyTx = async (data) => {
   return post({}, '/api/lhs/user/withdraw', data);
};

export const getRechargeInfoApi = async (data) => {
   return get({}, '/api/lhs/user/recharge-info', data);
};

export const getStripePayUrl = async (data) => {
   return get({}, '/api/lhs/stripe/recharge', data);
};

export const getStripeProxyMintPayUrl = async (data) => {
   return get({}, '/api/lhs/stripe/proxy-min-pay', data);
};

export const getStripePayResult = async (data) => {
   return post({}, '/api/lhs/stripe/result', data);
};

export const registerRecharge = async (data) => {
   return post({}, '/api/lhs/user/register-recharge', data);
};

export const sendEmailCodeApi = async (data) => {
   return post({}, '/api/lhs/user/send-email-code', data);
};

export const userLoginByLocalEmailCode = async (data) => {
   return post({}, '/api/lhs/user/login', data);
};

export const bindAbstractWallet = async (data) => {
   return post({}, '/api/lhs/user/bind-abstract-wallet', data);
};

export const deleteAbstractWallet = async (data) => {
   return post({}, '/api/lhs/user/delete-abstract-wallet', data);
};

export const getBindAbstractWallet = async () => {
   return get({}, '/api/lhs/user/get-bind-abstract-wallet');
};
