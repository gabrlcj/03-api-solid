import { CheckInsRepository } from '@/repositories/interfaces/check-ins.repository';
import { ResourceNotFoundError } from './errors/resource-not-found';
import { ValidateCheckInRequest, ValidateCheckInResponse } from './interfaces/validate-check-in';

export class ValidateCheckInService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({ checkInId }: ValidateCheckInRequest): Promise<ValidateCheckInResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return { checkIn };
  }
}
