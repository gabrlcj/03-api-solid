import { CheckInsRepository } from '@/repositories/interfaces/check-ins.repository';
import { GetUserMetricsRequest, GetUserMetricsResponse } from './interfaces/get-user-metrics';

export class GetUserMetricsService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({ userId }: GetUserMetricsRequest): Promise<GetUserMetricsResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId);

    return { checkInsCount };
  }
}
