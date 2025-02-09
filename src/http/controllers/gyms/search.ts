import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { makeSerchGymsService } from '@/services/factories/make-search-gyms';

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { query, page } = searchGymsQuerySchema.parse(request.body);

  const searchGymsService = makeSerchGymsService();

  const gyms = await searchGymsService.execute({ search: query, page });

  return reply.status(200).send({
    gyms,
  });
}
