import { CheckInService } from './check-in';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins.repository';

let checkInRepository: InMemoryCheckInsRepository;
let sut: CheckInService;

describe('Check-in Service', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository();
    sut = new CheckInService(checkInRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-id',
      gymId: 'gym-id',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2000, 0, 20, 0, 0, 0));

    await sut.execute({
      userId: 'user-id',
      gymId: 'gym-id',
    });

    await expect(() =>
      sut.execute({
        userId: 'user-id',
        gymId: 'gym-id',
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2000, 0, 20, 8, 0, 0));

    await sut.execute({
      userId: 'user-id',
      gymId: 'gym-id',
    });

    vi.setSystemTime(new Date(2000, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      userId: 'user-id',
      gymId: 'gym-id',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
