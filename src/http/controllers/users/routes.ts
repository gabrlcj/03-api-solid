import { FastifyInstance } from 'fastify';
import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { register } from './register.controller';
import { authenticate } from './authenticate.controller';
import { profile } from './profile.controller';
import { refresh } from './refresh';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/sessions', authenticate);

  app.patch('/token/refresh', refresh);

  /** Authenticathed */
  app.get('/me', { onRequest: [verifyJWT] }, profile);
}
