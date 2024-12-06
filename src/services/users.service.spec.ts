import { describe, expect, it } from 'vitest';
import { UsersService } from './users.service';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository';
import { UserAlreadyExistsError } from './errors/user-already-exists';

describe('Users Service', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const usersService = new UsersService(usersRepository);

    const { user } = await usersService.createUserService({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const usersService = new UsersService(usersRepository);

    const { user } = await usersService.createUserService({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const isPasswordCorrectlyHashed = await compare('123456', user.password_hash);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const usersService = new UsersService(usersRepository);

    await usersService.createUserService({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(() =>
      usersService.createUserService({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
