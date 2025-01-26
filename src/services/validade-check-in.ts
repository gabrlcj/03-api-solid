import { CheckInsRepository } from '@/repositories/interfaces/check-ins.repository';
import { ResourceNotFoundError } from './errors/resource-not-found';
import { ValidateCheckInRequest, ValidateCheckInResponse } from './interfaces/validate-check-in';
import dayjs from 'dayjs';
import { LateCheckInValidationError } from './errors/late-check-in-validation';

export class ValidateCheckInService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({ checkInId }: ValidateCheckInRequest): Promise<ValidateCheckInResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(checkIn.created_at, 'minutes');

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError();
    }

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return { checkIn };
  }
}
