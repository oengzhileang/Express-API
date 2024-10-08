import { UserInfoTypes } from "@/src/types/user-info.type";

export interface UserInfoResponse {
  message: string;
  data: UserInfoTypes;
}

export interface UserInfoPaginatedResponse{
  message : string;
  data:{
    [key:string] : UserInfoTypes[] | number;
    totalItems:number;
    totalPages:number;
    currentPages:number
  }
}