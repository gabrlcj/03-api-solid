import { UsersService } from '../users.service';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';

export function makeUsersService() {
  const usersRepository = new PrismaUsersRepository();
  const usersService = new UsersService(usersRepository);

  return usersService;
}
