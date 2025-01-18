import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from './errors/user-already-exists';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { RegisterUserParams, RegisterUserResponse } from '@/services/interfaces/register-user.interface';

export class RegisterService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUserParams): Promise<RegisterUserResponse> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return { user };
  }
}
