import { Gym } from '@prisma/client';

export interface SearchGymsParams {
  search: string;
  page: number;
}

export interface SearchGymsResponse {
  gyms: Gym[];
}
