export interface UserInfoFilterParams {
    category?: string;
  }
  
  export interface UserInfoSortParams {
    name?: 'asc' | 'desc';
    price?: 'asc' | 'desc';
  }
  
  export interface UserInfoGetAllRepoParams {
    page?: number;
    limit?: number;
    filter?: UserInfoFilterParams;
    sort?: UserInfoSortParams;
  }