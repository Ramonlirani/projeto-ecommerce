import { resolve } from 'path';

export function getEmailTemplatePath(fileName: string) {
  return resolve(__dirname, '..', 'email', 'views', fileName);
}
