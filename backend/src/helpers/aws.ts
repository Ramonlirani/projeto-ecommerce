import { S3Client } from '@aws-sdk/client-s3';
import { env } from '@env';

const s3 = new S3Client({
  region: 'sa-east-1',
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY,
    secretAccessKey: env.AWS_SECRET_KEY,
  },
});

export default s3;
