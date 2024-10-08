import {
  UserInfoCreateRequest,
  UserInfoUpdateRequest,
  UserInfoGetAllRequest
} from "../controllers/types/user-info-request.type";
import { UserInfoTypes } from "../types/user-info.type";
import UserInfoRepository from "@/src/database/repositories/user-info.repository";
export class UserInfoService {
  //add this
  public async getAllUserInfo(queries : UserInfoGetAllRequest){
    try{
      const {page , limit , filter , sort} = queries

      const newQueries = {
        page,
        limit,
        filter:filter && JSON.parse(filter),
        sort: sort && JSON.parse(sort)
      }
      const result = await UserInfoRepository.getAll(newQueries)
      return result
    }catch(error){
      console.error(`UserInfoService - getAllUserInfo() method error: ${error}`)
      throw error;
    }
  }

  //create user-info
  public async createUserInfo(
    userRequest: UserInfoCreateRequest
  ): Promise<UserInfoTypes> {
    try {
      const createUserInfo = await UserInfoRepository.createUserInfo(
        userRequest
      );
      return createUserInfo;
    } catch (error) {
      console.log(`UserInfoService - createUserInfo() method error`, error);
      throw error;
    }
  }
  //get 1 user-info by id
  public async getOneUserInfoById(id: string): Promise<UserInfoTypes> {
    try {
      const getUsers = await UserInfoRepository.getOneUserInfoById(id);
      return getUsers;
    } catch (error) {
      throw error;
    }
  }

  //update user-info by Id
  public async updateUserInfoById(
    id: String,
    userRequest: UserInfoUpdateRequest
  ): Promise<UserInfoTypes> {
    try {
      const getUsers = await UserInfoRepository.updateUserInfoById(
        id,
        userRequest
      );
      return getUsers;
    } catch (error) {
      throw error;
    }
  }

  //delete user-info by Id
  public async deleteUserInfoById(id: String): Promise<UserInfoTypes> {
    try {
      const getUsers = await UserInfoRepository.deleteUserInfoById(id);
      return getUsers;
    } catch (error) {
      throw error;
    }
  }
}
export default new UserInfoService();
