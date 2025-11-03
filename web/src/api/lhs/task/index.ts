import { get } from '@/utils/http';

export const getActivitiesTaskDetail = async (data) => {
   return get({}, '/api/lhs/activites/get-task-detail', data);
};

export const getActivityCategory = async (data) => {
   return get({}, '/api/lhs/activites/get-activity-category', data);
};

export const getTaskListByCategoryId = async (data) => {
   return get({}, '/api/lhs/activites/get-task-by-category', data);
};

export const verifyTwitterTask = async (data) => {
   return get({}, '/api/lhs/activites/verify-twitter-task', data);
};