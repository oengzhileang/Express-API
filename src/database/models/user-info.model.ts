import { Schema, model } from "mongoose";
import { UserInfoTypes } from "@/src/types/user-info.type";

const UserInfoSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  sex: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    retuire: true,
  },
  phNumber: {
    type: Number,
    require: true,
  },
});

const UserInfoModel = model<UserInfoTypes>("User-information", UserInfoSchema);

export default UserInfoModel;
