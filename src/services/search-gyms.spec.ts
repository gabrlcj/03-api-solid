import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { SearchGymsService } from './search-gyms';

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsService;

describe('Search Gyms Service', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsService(gymsRepository);
  });

  it('should be able to search for gyms by name', async () => {
    await gymsRepository.create({
      name: 'Javascript Gym',
      description: null,
      phone: null,
      latitude: -25.4677022,
      longitude: -49.2942842,
    });

    await gymsRepository.create({
      name: 'Typescript Gym',
      description: null,
      phone: null,
      latitude: -25.4677022,
      longitude: -49.2942842,
    });

    const { gyms } = await sut.execute({ search: 'Javascript', page: 1 });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ name: 'Javascript Gym' })]);
  });

  it('should be able to paginate searched gyms', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        name: `Javascript Gym-${i}`,
        description: null,
        phone: null,
        latitude: -25.4677022 + i,
        longitude: -49.2942842 + i,
      });
    }

    const { gyms } = await sut.execute({ search: 'Javascript', page: 2 });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ name: 'Javascript Gym-21' }),
      expect.objectContaining({ name: 'Javascript Gym-22' }),
    ]);
  });
});
