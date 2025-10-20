import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
  NODE_ENV: env.get('NODE_ENV').default('development').asString(),
  PORT: env.get('PORT').default(3000).asPortNumber(),
  DATABASE_URL: env.get('DATABASE_URL').required().asString(),

  GOOGLE_API_KEY: env.get('GOOGLE_API_KEY').required().asString()
};
