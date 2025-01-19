import { User } from '@prisma/client';

export interface AuthenticateUserRequest {
  email: string;
  password: string;
}

export interface AuthenticateUserResponse {
  user: User;
}
