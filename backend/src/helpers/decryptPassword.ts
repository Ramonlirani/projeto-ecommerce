import CryptoJS, { AES } from 'crypto-js';
import { env } from '@env';

export function decryptPassword(passwordHash: string): string {
  const key = env.PRIVATE_KEY;
  const bytes = AES.decrypt(passwordHash, key);

  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
}
