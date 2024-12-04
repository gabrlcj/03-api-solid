import { hash } from 'bcryptjs';
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository';

interface CreateUserParams {
  name: string;
  email: string;
  password: string;
}

export class UsersService {
  constructor(private usersRepository: PrismaUsersRepository) {}

  async createUserService({ name, email, password }: CreateUserParams) {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByUnique(email);

    if (userWithSameEmail) {
      throw new Error('Email already exists.');
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
