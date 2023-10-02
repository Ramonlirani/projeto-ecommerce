import { bucketName, s3 } from "@/helpers/aws.config";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const key = req.query.key as string; // The S3 object key of the image

  const params = {
    Bucket: bucketName,
    Key: key.toString(),
  };

  try {
    const response = await s3.getObject(params).promise();

    res.setHeader("Content-Type", response.ContentType!);
    return res.send(response.Body);
  } catch (error) {
    res.status(500).json({ error: "Erro ao fazer download da imagem" });
  }
}
