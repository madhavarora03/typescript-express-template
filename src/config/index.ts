import { config } from 'dotenv';
import { object, string } from 'zod';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

const schema = object({
  NODE_ENV: string({ required_error: 'NODE_ENV is required' }).min(1),
  PORT: string({ required_error: 'PORT is required' }).min(1),
  ADDRESS: string().default('0.0.0.0'),
  CORS_ORIGIN: string({ required_error: 'CORS_ORIGIN is required' }).min(1),
  MONGO_URI: string({ required_error: 'MONGO_URI is required' }).min(1),
});

const env = schema.parse(process.env);

export const { NODE_ENV, PORT, ADDRESS, CORS_ORIGIN, MONGO_URI } = env;
