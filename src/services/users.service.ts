import { hash } from 'bcryptjs';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists';
import { User } from '@prisma/client';

interface CreateUserParams {
  name: string;
  email: string;
  password: string;
}

interface CreateUserResponse {
  user: User;
}

export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async createUserService({ name, email, password }: CreateUserParams): Promise<CreateUserResponse> {
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
