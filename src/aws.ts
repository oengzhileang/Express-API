import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION, // 'your-region'
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export const uploadFileToS3 = async (file: Express.Multer.File) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Key: `${Date.now()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const data = await s3.send(new PutObjectCommand(params));
    return data;
  } catch (err) {
    console.log("Error", err);
    throw err;
  }
};
