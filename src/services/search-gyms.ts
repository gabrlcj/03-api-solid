import { GymsRepository } from '@/repositories/interfaces/gyms.repository';
import { SearchGymsParams, SearchGymsResponse } from './interfaces/search-gyms';

export class SearchGymsService {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ search, page }: SearchGymsParams): Promise<SearchGymsResponse> {
    const gyms = await this.gymsRepository.searchMany(search, page);

    return { gyms };
  }
}
