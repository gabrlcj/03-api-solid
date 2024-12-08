import { UsersService } from '../users.service';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';

export function makeUsersService() {
  const usersRepository = new PrismaUsersRepository();
  const usersSerivce = new UsersService(usersRepository);

  return usersSerivce;
}
