import { Gym } from '@prisma/client';

export interface FetchNearbyGymsParams {
  userLatitude: number;
  userLongitude: number;
}

export interface FetchNearbyGymsResponse {
  gyms: Gym[];
}
