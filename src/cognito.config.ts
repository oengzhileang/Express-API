import configs from "@/src/config";
export const cognitoConfig = {
  region: configs.AWS_REGION, // e.g., 'us-east-1'
  clientId: configs.COGNITO_CLIENT_ID,
  userPoolId: configs.COGNITO_USER_POOL_ID,
  clientSecret: configs.CLIENT_SECRET
};
