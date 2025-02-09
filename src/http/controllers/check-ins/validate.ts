import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { makeValidateCheckInService } from '@/services/factories/make-validate-check-in';
import { ResourceNotFoundError } from '@/services/errors/resource-not-found';
import { LateCheckInValidationError } from '@/services/errors/late-check-in-validation';

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = validateCheckInParamsSchema.parse(request.params);

  try {
    const validateCheckInService = makeValidateCheckInService();

    await validateCheckInService.execute({ checkInId });

    return reply.status(204).send();
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: error.message });
    }

    if (error instanceof LateCheckInValidationError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
