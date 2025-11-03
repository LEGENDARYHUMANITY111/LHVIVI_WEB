import axios from 'axios';
import { Md5 } from 'ts-md5';
import type {
   AxiosInstance,
   AxiosRequestConfig,
   AxiosResponse,
   AxiosError,
   InternalAxiosRequestConfig,
} from 'axios';
import { getMessage } from './status';
import { BaseResponse } from './types';
import { showNotification } from '../utils';

const service: AxiosInstance = axios.create({
   baseURL: Boolean(import.meta.env.VITE_APP_DEV_USE_MOCK)
      ? import.meta.env.VITE_APP_MOCK_BASEURL
      : import.meta.env.VITE_APP_API_BASEURL,
   timeout: 30000,
});

// axios实例拦截请求
service.interceptors.request.use(
   (config: InternalAxiosRequestConfig) => {
      //config.headers["Authorization"] = "Bearer " + localStorage.getItem('token');
      config.headers["Token"] = localStorage.getItem('lhs-api-token');
      return config;
   },
   (error: AxiosError) => {
      return Promise.reject(error);
   }
);

// axios实例拦截响应
service.interceptors.response.use(
   (response: AxiosResponse) => {
      if (response.status === 200) {
         if (response.data.code === 401) {
            localStorage.removeItem('lhs-api-token');
         }
         return response;
      }
      getMessage(response.status);
      return response;
   },
   // 请求失败
   (error: any) => {
      const { response } = error;
      const errorHashKey = Md5.hashStr(JSON.stringify(response))
      const cacheData = localStorage.getItem(errorHashKey)
      if (response) {
         // 请求已发出，但是不在2xx的范围
         if (!cacheData) {
            showNotification(getMessage(response.status), 'error')
            // 10 秒
            setTimeout(() => {
               localStorage.removeItem(errorHashKey)
            }, 60 * 1000)
         }

         return Promise.reject(response.data);
      }
      showNotification('Network connection abnormal, please try again later', 'error')
   }
);

// T 为 res.data.data 的类型
// BaseResponse 为 res.data 的类型
// 此处相当于响应拦截
// 为响应数据进行定制化处理
const msgRequest = <T = any>(config: AxiosRequestConfig): Promise<T> => {
   const conf = config;
   return new Promise((resolve, reject) => {
      service
         .request<any, AxiosResponse<BaseResponse>>(conf)
         .then((res: AxiosResponse<BaseResponse>) => {
            const data = res.data;
            if ("code" in data) {
               // 如果data.code为错误代码返回message信息
               if (data.code != 1) {
                  showNotification(data.msg, 'error')
                  reject(data.msg);
               } else {
                  // ElMessage({
                  //    message: data.message,
                  //    type: 'success',
                  // });
                  // 此处返回data信息 也就是 api 中配置好的 Response类型
                  resolve(data.data as T);
               }
            } else {
               resolve(data as T);
            }

         });
   });
};

export function get<T = any, U = any>(
   config: AxiosRequestConfig,
   url: string,
   parms?: U
): Promise<T> {
   return msgRequest({ ...config, url, method: 'GET', params: parms });
}

export function post<T = any, U = any>(
   config: AxiosRequestConfig,
   url: string,
   data: U
): Promise<T> {
   return msgRequest({ ...config, url, method: 'POST', data: data });
}
