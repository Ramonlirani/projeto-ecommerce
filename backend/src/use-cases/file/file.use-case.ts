import { Injectable } from '@nestjs/common';
import fs from 'fs';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { env } from '@env';
import mime from 'mime';
import s3 from '@helpers/aws';
import { randomUUID } from 'crypto';

@Injectable()
export class FileUseCases {
  async uploadToS3(file: Express.Multer.File) {
    try {
      const fileName = randomUUID();
      const bucketName = env.AWS_BUCKET_NAME as string;
      const basePathS3 = `albums/content/${fileName}`;

      await s3.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: basePathS3,
          Body: file.buffer,
          ContentType: file.mimetype,
        }),
      );

      return env.AWS_BASE_URL + basePathS3;
    } catch (error) {
      throw new Error(error);
    }
  }

  async uploadQrCodeToS3(fileName: string, filePath: string) {
    try {
      if (!fs.existsSync(filePath)) return;
      const fileContent = fs.readFileSync(filePath);
      const mimeType = mime.getType(filePath);

      const bucketName = env.AWS_BUCKET_NAME as string;
      const basePathS3 = `albums/qrcode/${fileName}`;

      await s3.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: basePathS3,
          Body: fileContent,
          ContentType: mimeType,
        }),
      );

      return env.AWS_BASE_URL + basePathS3;
    } catch (error) {
      throw new Error(error);
    }
  }

  async uploadBase64ToS3(base64: string, fileName: string) {
    try {
      const buf = Buffer.from(
        base64.replace(/^data:image\/\w+;base64,/, ''),
        'base64',
      );

      let mimeType = null;
      const matches = base64.match(/^data:(.*);base64,/);
      if (matches && matches.length > 1) {
        mimeType = matches[1];
      }

      const bucketName = env.AWS_BUCKET_NAME as string;
      const basePathS3 = `albums/personMainPhoto/${fileName}`;

      await s3.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: basePathS3,
          Body: buf,
          ContentEncoding: 'base64',
          ContentType: mimeType,
        }),
      );

      return env.AWS_BASE_URL + basePathS3;
    } catch (error) {
      throw new Error(error);
    }
  }

  delete(filePath: string) {
    try {
      if (!fs.existsSync(filePath)) return;

      fs.unlinkSync(filePath);
    } catch (error) {
      throw new Error(error);
    }
  }
}
