import { AuthType } from "@/src/types/auth.type";
export interface AuthResponse {
  message: string;
  data: AuthType;
}