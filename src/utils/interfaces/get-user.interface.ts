import { User } from '@prisma/client';

export interface GetUserParams {
  id: string;
}

export interface GetUserResponse {
  user: User;
}
