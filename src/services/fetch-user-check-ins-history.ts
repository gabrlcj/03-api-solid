import { CheckInsRepository } from '@/repositories/interfaces/check-ins.repository';
import { FetchUserCheckInsRequest, FetchUserCheckInsResponse } from './interfaces/fetch-user-check-ins-history';

export class FetchUserCheckInsService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({ userId, page }: FetchUserCheckInsRequest): Promise<FetchUserCheckInsResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId, page);

    return { checkIns };
  }
}
