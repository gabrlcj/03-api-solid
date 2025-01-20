import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials';
import { makeAuthenticateService } from '@/services/factories/make-authenticate';

export async function authenticateUser(request: FastifyRequest, reply: FastifyReply) {
  const authenticateUserBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateUserBodySchema.parse(request.body);

  try {
    const authenticateSerivce = makeAuthenticateService();

    await authenticateSerivce.authenticateUser({ email, password });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(200).send();
}
