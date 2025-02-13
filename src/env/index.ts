import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333),
});

const tempEnv = envSchema.safeParse(process.env);

if (tempEnv.success === false) {
  console.error('Invalid environments variables', tempEnv.error.format());

  throw new Error();
}

export const env = tempEnv.data;
