import { Gym } from '@prisma/client';

export interface CreateGymParams {
  name: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

export interface CreateGymResponse {
  gym: Gym;
}
