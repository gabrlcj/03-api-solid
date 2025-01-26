import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins.repository';
import { ValidateCheckInService } from './validade-check-in';
import { ResourceNotFoundError } from './errors/resource-not-found';

let checkInRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInService;

describe('Validate Check-in Service', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInService(checkInRepository);
  });

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    });

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date));
  });

  it('should not be able to validate an inexistent check-in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'no-existing-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
