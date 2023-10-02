import S3 from "aws-sdk/clients/s3";

export const bucketName = process.env.BUCKET_NAME as string;

export const s3 = new S3({
  region: "sa-east-1",
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  apiVersion: "v3",
});
