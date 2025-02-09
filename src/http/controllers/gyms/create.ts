import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { makeCreateGymService } from '@/services/factories/make-create-gym';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { name, description, phone, latitude, longitude } = createGymBodySchema.parse(request.body);

  const createGymsService = makeCreateGymService();

  await createGymsService.execute({ name, description, phone, latitude, longitude });

  return reply.status(201).send();
}
