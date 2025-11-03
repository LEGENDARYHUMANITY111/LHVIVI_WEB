import { get } from '@/utils/http';

export const getHomeUserList = async (data) => {
   return get({}, '/api/lhs/common/home-user-list', data);
};