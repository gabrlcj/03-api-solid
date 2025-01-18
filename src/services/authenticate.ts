import { compare } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { AuthenticateUserRequest, AuthenticateUserResponse } from '@/services/interfaces/authenticate-user.interface';

export class AuthenticateService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, password }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return { user };
  }
}
