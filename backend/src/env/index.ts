import { z } from 'zod';
import dotenv from 'dotenv';
import path from 'path';

const ENV = process.env.NODE_ENV;

dotenv.config({
  path: path.resolve(process.cwd(), !ENV ? '.env' : `.env.${ENV}`),
});

const envSchema = z.object({
  PORT: z.coerce.number().default(3101),
  NODE_ENV: z.enum(['dev', 'test', 'prod']).default('dev'),
  RUN_SEED_PERMISSIONS: z.coerce.boolean().default(false),
  DATABASE_URL: z.string(),
  PUBLIC_KEY: z.string(),
  PRIVATE_KEY: z.string(),
  SENDGRID_API_KEY: z.string(),
  FRONTEND_URL: z.string(),
  SENTRY_DNS: z.string(),
  AWS_ACCESS_KEY: z.string(),
  AWS_SECRET_KEY: z.string(),
  AWS_BUCKET_NAME: z.string(),
  AWS_BASE_URL: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('❌ Invalid environment variables', _env.error.format());

  throw new Error('Invalid environment variables.');
}

export const env = _env.data;
