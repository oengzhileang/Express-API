import {
  Controller,
  Post,
  Response,
  Body,
  Route,
  Tags,
  Path,
  Get,
  Patch,
  Delete,
  Queries,
} from "tsoa";
import {
  UserInfoCreateRequest,
  UserInfoGetAllRequest,
  UserInfoUpdateRequest,
} from "./types/user-info-request.type";
import {
  UserInfoPaginatedResponse,
  UserInfoResponse,
} from "./types/user-info-response.type";
import UserInfoService from "@/src/services/user-info.service";
@Tags("User-information")
@Route("/v1/api/user-information")
export class UserInfoController extends Controller {
  //add this
  @Get()
  public async getAllUserInfo(
    @Queries() queries: UserInfoGetAllRequest
  ): Promise<UserInfoPaginatedResponse> {
    try {
      const response = await UserInfoService.getAllUserInfo(queries);
      return {
        message: "success",
        data: {
          ...response,
          currentPages: response.currentPage, // Ensure currentPages is included
        },
      };
    } catch (error) {
      console.error(`UserInfoController - getAllUserInfo() method error` , error);
      
      throw error;
    }
  }
  //create user-info
  @Post()
  @Response(201, "Create Success")
  public async createUserInfo(
    @Body() requestBody: UserInfoCreateRequest
  ): Promise<UserInfoResponse> {
    try {
      const createUserInfo = await UserInfoService.createUserInfo(requestBody);
      return {
        message: "Create Success",
        data: {
          name: createUserInfo.name,
          age: createUserInfo.age,
          sex: createUserInfo.sex,
          email: createUserInfo.email,
          phNumber: createUserInfo.phNumber,
        },
      };
    } catch (error) {
      console.log(`UserInfoService - createUserInfo method error`, error);
      throw error;
    }
  }
  //get 1 user-info by Id
  @Get("{id}")
  public async getOneUserInfoById(
    @Path() id: string
  ): Promise<UserInfoResponse> {
    try {
      const getUsers = await UserInfoService.getOneUserInfoById(id);
      return {
        message: "Get One User-Info Success",
        data: getUsers,
      };
    } catch (error) {
      console.log(`UserInfoService - getUsers method errror`, error);
      throw error;
    }
  }

  //update user-info by Id
  @Patch("{id}")
  public async updateUserInfoById(
    @Path() id: String,
    @Body() requestBody: UserInfoUpdateRequest
  ): Promise<UserInfoResponse> {
    try {
      const getUsers = await UserInfoService.updateUserInfoById(
        id,
        requestBody
      );
      return {
        message: "Update user-info success",
        data: getUsers,
      };
    } catch (error) {
      console.log(`UserInfoservice - getUsers method error`, error);
      throw error;
    }
  }
  // delete user-info by Id
  @Delete("{id}")
  public async deleteUserInfoById(
    @Path() id: String
  ): Promise<UserInfoResponse> {
    try {
      const getUsers = await UserInfoService.deleteUserInfoById(id);
      return {
        message: "Delete Success",
        data: getUsers,
      };
    } catch (error) {
      throw error;
    }
  }
}
