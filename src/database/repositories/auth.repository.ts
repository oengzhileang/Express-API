// import {
//   CognitoIdentityProviderClient,
//   SignUpCommand,
//   ConfirmSignUpCommand,
//   InitiateAuthCommand,
// } from "@aws-sdk/client-cognito-identity-provider";
// import { cognitoConfig } from "@/src/cognito.config";
// import { generateSecretHash } from "@/src/utils/cognito.util";
// // Initialize Cognito Client
// const cognitoClient = new CognitoIdentityProviderClient({
//   region: cognitoConfig.region,
// });

// class AuthRepo {
//   //sign up
//   public async signUp(email: string, password: string) {
//     const params = {
//       ClientId: cognitoConfig.clientId,
//       Username: email,
//       Password: password,
//       UserAttributes: [{ Name: "email", Value: email }],
//       SecretHash: generateSecretHash(
//         email,
//         cognitoConfig.clientId,
//         cognitoConfig.clientSecret
//       ), // Include the secret hash
//     };
//     try {
//       const command = new SignUpCommand(params);
//       const result = await cognitoClient.send(command);
//       return result;
//     } catch (error) {
//       throw error;
//     }
//   }

//   //verify email with confirmcode
//   public async verify(email: string, confirmationCode: string) {
//     const params = {
//       ClientId: cognitoConfig.clientId,
//       Username: email, // Use the email as the username for confirmation
//       ConfirmationCode: confirmationCode,
//       SecretHash: generateSecretHash(
//         email,
//         cognitoConfig.clientId,
//         cognitoConfig.clientSecret
//       ), // Include the secret hash
//     };
//     try {
//       const command = new ConfirmSignUpCommand(params);
//       const result = await cognitoClient.send(command);
//       return result;
//     } catch (error) {
//       throw error;
//     }
//   }

//   //sign in
//   public async signIn(email: string, password: string) {
//     const params = {
//       AuthFlow: "USER_PASSWORD_AUTH" as const, // Use the `USER_PASSWORD_AUTH` flow for direct sign-in
//       ClientId: cognitoConfig.clientId,
//       AuthParameters: {
//         USERNAME: email, // Use email as the username
//         PASSWORD: password,
//         SECRET_HASH: generateSecretHash(
//           email,
//           cognitoConfig.clientId,
//           cognitoConfig.clientSecret
//         ), // Include the secret hash if client secret is configured
//       },
//     };
//     try {
//       const command = new InitiateAuthCommand(params);
//       const result = await cognitoClient.send(command);
//       return result;
//     } catch (error) {
//       throw error;
//     }
//   }
// }

// //add more method as need
// export default new AuthRepo();
