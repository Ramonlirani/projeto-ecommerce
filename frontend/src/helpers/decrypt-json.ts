import CryptoJS, { AES } from "crypto-js";

export function decryptJSON<T>(jsonHash: string): T {
  const key = process.env.NEXT_PUBLIC_APP_SECRET as string;

  const bytes = AES.decrypt(jsonHash, key);

  const originalData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  return originalData as T;
}
