import AuthRepo from "../database/repositories/auth.repository";
class AuthService {
  //sign up
  public async signUp(email: string, password: string) {
    try {
      const result = await AuthRepo.signUp(email, password);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // verify
  public async verify(email: string, confirmationCode: string) {
    try {
      const result = await AuthRepo.verify(email, confirmationCode);
      return result;
    } catch (error) {
      throw error;
    }
  }
  //sign in
  public async signIn(email: string, password: string) {
    try {
      const result = await AuthRepo.signIn(email, password);
      return result.AuthenticationResult;
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthService();
