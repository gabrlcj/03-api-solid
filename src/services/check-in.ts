import { CheckInRequest, CheckInResponse } from '@/services/interfaces/check-in';
import { CheckInsRepository } from '@/repositories/interfaces/check-ins.repository';

export class CheckInService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({ userId, gymId }: CheckInRequest): Promise<CheckInResponse> {
    const checkIn = await this.checkInsRepository.create({ user_id: userId, gym_id: gymId });

    return { checkIn };
  }
}
