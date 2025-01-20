import { CheckInService } from './check-in';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins.repository';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository';
import { Decimal } from '@prisma/client/runtime/library';
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins';
import { MaxDistanceError } from './errors/max-distance';

let checkInRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInService;

describe('Check-in Service', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInService(checkInRepository, gymsRepository);

    await gymsRepository.create({
      id: 'gym-01',
      name: 'Javascript Gym',
      description: null,
      phone: null,
      latitude: -25.4677022,
      longitude: -49.2942842,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -25.4677022,
      userLongitude: -49.2942842,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2000, 0, 20, 0, 0, 0));

    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -25.4677022,
      userLongitude: -49.2942842,
    });

    await expect(() =>
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-01',
        userLatitude: -25.4677022,
        userLongitude: -49.2942842,
      })
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2000, 0, 20, 8, 0, 0));

    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -25.4677022,
      userLongitude: -49.2942842,
    });

    vi.setSystemTime(new Date(2000, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -25.4677022,
      userLongitude: -49.2942842,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      name: 'Javascript Gym',
      description: '',
      latitude: new Decimal(-25.4467779),
      longitude: new Decimal(-49.2540725),
      phone: '',
      created_at: new Date(),
    });

    await expect(() =>
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-02',
        userLatitude: -25.4677022,
        userLongitude: -49.2942842,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
