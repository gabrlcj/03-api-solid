import { CheckIn } from '@prisma/client';

export interface CheckInRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

export interface CheckInResponse {
  checkIn: CheckIn;
}
