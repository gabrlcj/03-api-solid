import { makeGetUserProfileService } from '@/services/factories/make-get-user-profile';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserService = makeGetUserProfileService();

  const { user } = await getUserService.execute({
    id: request.user.sub,
  });

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  });
}
