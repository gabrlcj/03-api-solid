import { CheckIn } from '@prisma/client';

export interface FetchUserCheckInsRequest {
  userId: string;
  page: number;
}

export interface FetchUserCheckInsResponse {
  checkIns: CheckIn[];
}
