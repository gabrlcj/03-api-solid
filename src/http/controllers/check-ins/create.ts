import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { makeCheckInService } from '@/services/factories/make-check-in';
import { MaxNumberOfCheckInsError } from '@/services/errors/max-number-of-check-ins';
import { MaxDistanceError } from '@/services/errors/max-distance';
import { ResourceNotFoundError } from '@/services/errors/resource-not-found';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  });

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { gymId } = createCheckInParamsSchema.parse(request.params);
  const { latitude, longitude } = createCheckInBodySchema.parse(request.body);

  try {
    const createCheckInService = makeCheckInService();

    const checkIn = await createCheckInService.execute({
      userId: request.user.sub,
      gymId,
      userLatitude: latitude,
      userLongitude: longitude,
    });

    return reply.status(200).send({
      checkIn,
    });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: error.message });
    }

    if (error instanceof MaxDistanceError) {
      return reply.status(409).send({ message: error.message });
    }

    if (error instanceof MaxNumberOfCheckInsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
