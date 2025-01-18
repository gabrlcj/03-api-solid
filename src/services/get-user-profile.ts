import { ResourceNotFoundError } from './errors/resource-not-found';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { GetUserProfileParams, GetUserProfileResponse } from '@/services/interfaces/get-user-profile.interface';

export class GetUserProfileService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id }: GetUserProfileParams): Promise<GetUserProfileResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return { user };
  }
}
