import { GymsRepository } from '@/repositories/interfaces/gyms.repository';
import { FetchNearbyGymsParams, FetchNearbyGymsResponse } from './interfaces/fetch-nearby-gyms';

export class FetchNearbyGymsService {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ userLatitude, userLongitude }: FetchNearbyGymsParams): Promise<FetchNearbyGymsResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return { gyms };
  }
}
