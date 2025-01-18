import { beforeEach, describe, expect, it } from 'vitest';
import { UsersService } from './users.service';
import { compare, hash } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository';
import { UserAlreadyExistsError } from './errors/user-already-exists';
import { ResourceNotFoundError } from './errors/resource-not-found';

let usersRepository: InMemoryUsersRepository;
let usersService: UsersService;

describe('Users Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    usersService = new UsersService(usersRepository);
  });

  it('should be able to register', async () => {
    const { user } = await usersService.createUser({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash user password upon registration', async () => {
    const { user } = await usersService.createUser({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const isPasswordCorrectlyHashed = await compare('123456', user.password_hash);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to register with same email twice', async () => {
    await usersService.createUser({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(() =>
      usersService.createUser({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});

describe('Get User Profile Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    usersService = new UsersService(usersRepository);
  });

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    });

    const { user } = await usersService.getUser({
      id: createdUser.id,
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual('John Doe');
  });

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      usersService.getUser({
        id: 'not-existing-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
