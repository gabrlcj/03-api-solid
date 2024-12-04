import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository';

interface CreateUserParams {
  name: string;
  email: string;
  password: string;
}

export async function createUserService({ name, email, password }: CreateUserParams) {
  const password_hash = await hash(password, 6);

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithSameEmail) {
    throw new Error('Email already exists.');
  }

  const prismaUsersRepository = new PrismaUsersRepository();

  prismaUsersRepository.create({
    name,
    email,
    password_hash,
  });
}
