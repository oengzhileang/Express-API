export interface UserInfoCreateRequest {
  name: string;
  age: number;
  sex: string;
  email: string;
  phNumber: number;
}

//user update request
export interface UserInfoUpdateRequest {
  name?: string;
  age?: number;
  sex?: string;
  email?: string;
  phNumber?: number;
}

// Add this
export interface UserInfoGetAllRequest {
  page?: number;
  limit?: number;
  filter?: string;
  sort?: string;
}
