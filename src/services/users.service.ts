import { hash } from 'bcryptjs';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists';
import { CreateUserParams, CreateUserResponse } from '@/utils/interfaces/create-user.interface';
import { GetUserParams, GetUserResponse } from '@/utils/interfaces/get-user.interface';
import { ResourceNotFoundError } from './errors/resource-not-found';

export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async createUser({ name, email, password }: CreateUserParams): Promise<CreateUserResponse> {
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

  async getUser({ id }: GetUserParams): Promise<GetUserResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return { user };
  }
}
