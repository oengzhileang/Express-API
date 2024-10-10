import { Controller, Post, Route, Tags, Body } from "tsoa";
import {
  SignUpRequest,
  VerifyUserRequest,
  SignInRequest,
} from "./types/auth-request.type";
import AuthService from "../services/auth.service";
@Route("v1/auth")
@Tags("Authentication")
export class AuthController extends Controller {
  //sign up
  @Post("/sign-up")
  async registerUser(@Body() requestBody: SignUpRequest) {
    const { email, password } = requestBody;
    try {
      const result = await AuthService.signUp(email, password);
      return {
        message: "Sign up successfully",
        data: result,
      };
    } catch (error) {
      throw error;
    }
  }

  //verify
  @Post("/verify-email")
  async verifyEmail(@Body() requestBody: VerifyUserRequest) {
    const { email, confirmationCode } = requestBody;
    try {
      const verifyEmail = await AuthService.verify(email, confirmationCode);
      return {
        message: "Email verified successfully",
        data: verifyEmail,
      };
    } catch (error) {
      throw error;
    }
  }

  //sign in
  @Post("/sign-in")
  async loginUser(@Body() requestBody: SignInRequest) {
    try {
      const { email, password } = requestBody;
      const authResult = await AuthService.signIn(email, password);
      return {
        message: "User signed in successfully",
        accessToken: authResult.AuthenticationResult?.AccessToken,
        idToken: authResult?.AuthenticationResult?.IdToken,
        refreshToken: authResult?.AuthenticationResult?.RefreshToken,
      };
    } catch (error) {
      throw error;
    }
  }
}
