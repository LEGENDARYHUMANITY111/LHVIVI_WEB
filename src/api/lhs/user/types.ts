export type TaskListPageList = {
   total: number;
   per_page: number,
   last_page: number,
   current_page: number,
   data: TaskListItem[];
};

export type TaskListItem = {
   name: string,
   create_time: string,
   reward_num: number
};

export type MyInvicationPageList = {
   total: number;
   per_page: number,
   last_page: number,
   current_page: number,
   data: MyInvicationUser[];
};

export type MyInvicationUser = {
   nickname: string,
   member_id: number,
   headimg: string,
   point: number,
   create_time: string,
   invate: {
      nickname: string
   }
};

export type InvateCode = {
   url: string,
   code: string,
   img: string
};