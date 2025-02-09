import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { makeFetchNearbyGymsService } from '@/services/factories/make-fetch-nearby-gyms';

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = nearbyGymBodySchema.parse(request.body);

  const featchNearbyGymsService = makeFetchNearbyGymsService();

  const gyms = await featchNearbyGymsService.execute({ userLatitude: latitude, userLongitude: longitude });

  return reply.status(200).send({
    gyms,
  });
}
