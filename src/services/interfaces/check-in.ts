import { CheckIn } from '@prisma/client';

export interface CheckInRequest {
  userId: string;
  gymId: string;
}

export interface CheckInResponse {
  checkIn: CheckIn;
}
