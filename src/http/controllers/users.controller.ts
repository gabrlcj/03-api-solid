import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { UsersService } from '@/services/users.service';
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository';

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = createUserBodySchema.parse(request.body);

  try {
    const usersRepository = new PrismaUsersRepository();
    const usersSerivce = new UsersService(usersRepository);

    await usersSerivce.createUserService({ name, email, password });
  } catch (error) {
    return reply.status(409).send();
  }

  return reply.status(201).send();
}
