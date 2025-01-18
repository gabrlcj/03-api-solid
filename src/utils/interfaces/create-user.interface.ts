import { User } from '@prisma/client';

export interface CreateUserParams {
  name: string;
  email: string;
  password: string;
}

export interface CreateUserResponse {
  user: User;
}
