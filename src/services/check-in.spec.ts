import { CheckInService } from './check-in';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins.repository';

let checkInRepository: InMemoryCheckInsRepository;
let sut: CheckInService;

describe('Check-in Service', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository();
    sut = new CheckInService(checkInRepository);
  });

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-id',
      gymId: 'gym-id',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
