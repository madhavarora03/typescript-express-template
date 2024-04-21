import { config } from 'dotenv';
import { object, string } from 'zod';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

const schema = object({
  NODE_ENV: string({ required_error: 'NODE_ENV is required' }).min(1),
  PORT: string({ required_error: 'PORT is required' }).min(1),
  ADDRESS: string().default('0.0.0.0'),
  ACCESS_TOKEN_SECRET: string({
    required_error: 'ACCESS_TOKEN_SECRET is required',
  }).min(1),
  ACCESS_TOKEN_EXPIRY: string({
    required_error: 'ACCESS_TOKEN_EXPIRY is required',
  }).min(1),
  REFRESH_TOKEN_SECRET: string({
    required_error: 'REFRESH_TOKEN_SECRET is required',
  }).min(1),
  REFRESH_TOKEN_EXPIRY: string({
    required_error: 'REFRESH_TOKEN_EXPIRY is required',
  }).min(1),
  MONGO_URI: string({ required_error: 'MONGO_URI is required' }).min(1),
  CORS_ORIGIN: string({ required_error: 'CORS_ORIGIN is required' }).min(1),
  MAILER_HOST: string({ required_error: 'MAILER_HOST is required' }).min(1),
  MAILER_PORT: string().default('2525'),
  MAILER_USER: string({ required_error: 'MAILER_USER is required' }).min(1),
  MAILER_PASS: string({ required_error: 'MAILER_PASS is required' }).min(1),
  FRONTEND_DOMAIN: string({
    required_error: 'FRONTEND_DOMAIN is required',
  }).min(1),
});

const env = schema.parse(process.env);

export const {
  NODE_ENV,
  PORT,
  ADDRESS,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
  MONGO_URI,
  CORS_ORIGIN,
  MAILER_HOST,
  MAILER_PORT,
  MAILER_USER,
  MAILER_PASS,
  FRONTEND_DOMAIN,
} = env;
