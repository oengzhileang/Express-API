import { model, Schema } from "mongoose";
import { AuthType } from "@/src/types/auth.type";
const authSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  cognitoId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const AuthModel = model<AuthType>("Authentication", authSchema);

export default AuthModel;
// src/models/auth.model.ts
// export interface AuthModel {
//     email: string;
//     password: string;
//   }
