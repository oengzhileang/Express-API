import { S3Client } from "@aws-sdk/client-s3";
import configs from "../config";
const s3 = new S3Client({
  region: configs.AWS_REGION,
  credentials: {
    accessKeyId: configs.AWS_ACCESS_KEY_ID,
    secretAccessKey: configs.AWS_SECRET_ACCESS_KEY,
  },
});

export default s3;
