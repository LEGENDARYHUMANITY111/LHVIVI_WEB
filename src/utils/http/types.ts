// 返回res.data的interface
export interface BaseResponse<T = any> {
   code: number | string;
   msg: string;
   data: T;
}
