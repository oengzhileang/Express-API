export interface AuthCreateRequest {
  email: string;
  password: string;
}
export interface AuthVerifyRequest {
  email: string;
  confirmationCode: string;
}
