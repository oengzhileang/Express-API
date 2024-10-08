import UserInfoModel from "../models/user-info.model";
import { UserInfoTypes } from "@/src/types/user-info.type";
import {
  UserInfoCreateRequest,
  UserInfoUpdateRequest,
} from "@/src/controllers/types/user-info-request.type";
import { UserInfoGetAllRepoParams , UserInfoSortParams } from "./types/user-info.repository.type";
import { NotFoundError } from "@/src/utils/error";
import { SortOrder } from "mongoose";
class UserInfoRepository {



  // Add this
  async getAll(queries: UserInfoGetAllRepoParams) {
    const { page = 1, limit = 10, filter = {}, sort = { name: 'desc' } } = queries;

    // Convert sort from {'field': 'desc'} to {'field': -1}
    const sortFields = Object.keys(sort).reduce((acc, key) => {
      const direction = sort[key as keyof UserInfoSortParams];
      if (direction === 'asc' || direction === 'desc') {
        acc[key as keyof UserInfoSortParams] = direction === 'asc' ? 1 : -1;
      }
      return acc;
    }, {} as Record<keyof UserInfoSortParams, SortOrder>);

    // Build MongoDB filter object
    const buildFilter = (filter: Record<string, any>) => {
      const mongoFilter: Record<string, any> = {};
      for (const key in filter) {
        if (typeof filter[key] === 'object') {
          if (filter[key].hasOwnProperty('min') || filter[key].hasOwnProperty('max')) {
            mongoFilter[key] = {};
            if (filter[key].min !== undefined) {
              mongoFilter[key].$gte = filter[key].min;
            }
            if (filter[key].max !== undefined) {
              mongoFilter[key].$lte = filter[key].max;
            }
          } else {
            mongoFilter[key] = filter[key];
          }
        } else {
          mongoFilter[key] = filter[key];
        }
      }
      return mongoFilter;
    };

    try {
      const mongoFilter = buildFilter(filter);
      console.log(mongoFilter)
      const operation = UserInfoModel.find(mongoFilter)
        .sort(sortFields)
        .skip((page - 1) * limit)
        .limit(limit);

      const result = await operation;
      const totalItems = await UserInfoModel.countDocuments(mongoFilter);

      return {
        [UserInfoModel.collection.collectionName]: result,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page
      };
    } catch (error) {
      console.error(`ProductRepository - getAll() method error: ${error}`);
      throw error;
    }
  }
  //Create User-Information
  public async createUserInfo(
    userRequest: UserInfoCreateRequest
  ): Promise<UserInfoTypes> {
    try {
      const createUserInfo = await UserInfoModel.create(userRequest);
      return createUserInfo;
    } catch (error) {
      throw error;
    }
  }

  //get one user-info by id
  public async getOneUserInfoById(id: String): Promise<UserInfoTypes> {
    try {
      const getUsers = await UserInfoModel.findById(id);
      if (!getUsers) {
        throw new NotFoundError({ message: "User-info not found" });
      }
      return getUsers;
    } catch (error) {
      throw error;
    }
  }

  //update user-info by id
  public async updateUserInfoById(
    id: String,
    userRequest: UserInfoUpdateRequest
  ): Promise<UserInfoTypes> {
    try {
      const getUsers = await UserInfoModel.findByIdAndUpdate(id, userRequest, {
        new: true,
      });
      if (!getUsers) {
        throw new NotFoundError({ message: "User-info not found" });
      }
      return getUsers;
    } catch (error) {
      throw error;
    }
  }

  //delete user-info by Id
  public async deleteUserInfoById(id: String): Promise<UserInfoTypes> {
    try {
      const getUsers = await UserInfoModel.findByIdAndDelete(id);
      if (!getUsers) {
        throw new NotFoundError({ message: "User-info not found" });
      }
      return getUsers;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserInfoRepository();
