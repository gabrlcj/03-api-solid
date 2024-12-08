import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists';
import { makeUsersService } from '@/services/factories/make-users.service';

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = createUserBodySchema.parse(request.body);

  try {
    const usersSerivce = makeUsersService();

    await usersSerivce.createUserService({ name, email, password });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(201).send();
}
