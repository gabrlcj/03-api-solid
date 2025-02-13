import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { makeFetchNearbyGymsService } from '@/services/factories/make-fetch-nearby-gyms';

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = nearbyGymQuerySchema.parse(request.query);

  const featchNearbyGymsService = makeFetchNearbyGymsService();

  const { gyms } = await featchNearbyGymsService.execute({ userLatitude: latitude, userLongitude: longitude });

  return reply.status(200).send({ gyms });
}
