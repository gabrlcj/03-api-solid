import { AuthenticateService } from '../authenticate';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';

export function makeAuthenticateService() {
  const usersRepository = new PrismaUsersRepository();
  const authenticateService = new AuthenticateService(usersRepository);

  return authenticateService;
}
