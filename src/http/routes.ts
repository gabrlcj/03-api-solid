import { FastifyInstance } from 'fastify';
import { createUser } from './controllers/users.controller';
import { authenticateUser } from './controllers/authenticate.controller';

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', createUser);

  app.post('/sessions', authenticateUser);
}
