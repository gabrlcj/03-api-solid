import { User } from '@prisma/client';

export interface RegisterUserParams {
  name: string;
  email: string;
  password: string;
}

export interface RegisterUserResponse {
  user: User;
}
