import { AES } from 'crypto-js';
import { env } from '@env';

export function encryptPassword(password: string): string {
  const key = env.PRIVATE_KEY;
  return AES.encrypt(password, key).toString();
}
