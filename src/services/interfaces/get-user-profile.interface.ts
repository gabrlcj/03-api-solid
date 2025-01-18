import { User } from '@prisma/client';

export interface GetUserProfileParams {
  id: string;
}

export interface GetUserProfileResponse {
  user: User;
}
