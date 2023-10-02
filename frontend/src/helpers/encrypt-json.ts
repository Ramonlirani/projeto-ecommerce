import { AES } from "crypto-js";

export function encryptJSON(data: any): string {
  const json = JSON.stringify(data);

  const key = process.env.NEXT_PUBLIC_APP_SECRET as string;
  return AES.encrypt(json, key).toString();
}
