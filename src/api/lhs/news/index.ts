import { get } from '@/utils/http';

export const getNewsList = async (data) => {
   return get({}, '/api/lhs/news/list', data);
};

export const getNewsDetail = async (data) => {
   return get({}, '/api/lhs/news/detail', data);
};

export const getNewsRecommand = async (data) => {
   return get({}, '/api/lhs/news/recommand', data);
};