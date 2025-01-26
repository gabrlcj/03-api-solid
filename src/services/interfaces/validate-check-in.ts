import { CheckIn } from '@prisma/client';

export interface ValidateCheckInRequest {
  checkInId: string;
}

export interface ValidateCheckInResponse {
  checkIn: CheckIn;
}
