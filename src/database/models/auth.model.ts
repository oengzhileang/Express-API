import { model, Schema } from "mongoose";
import { AuthType } from "@/src/types/auth.type";
const authSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const AuthModel = model<AuthType>("Authentication", authSchema)

export default AuthModel
// src/models/auth.model.ts
// export interface AuthModel {
//     email: string;
//     password: string;
//   }
  