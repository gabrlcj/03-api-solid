import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { FetchNearbyGymsService } from './fetch-nearby-gyms';

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsService;

describe('Fetch Nearby Gyms Service', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsService(gymsRepository);
  });

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      name: 'Near Gym',
      description: null,
      phone: null,
      latitude: -25.4677022,
      longitude: -49.2942842,
    });

    await gymsRepository.create({
      name: 'Far Gym',
      description: null,
      phone: null,
      latitude: -26.4677022,
      longitude: -49.2942842,
    });

    const { gyms } = await sut.execute({ userLatitude: -25.4677022, userLongitude: -49.2942842 });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ name: 'Near Gym' })]);
  });
});
