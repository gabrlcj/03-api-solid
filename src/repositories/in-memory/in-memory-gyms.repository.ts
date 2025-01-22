import { Gym, Prisma } from '@prisma/client';
import { GymsRepository } from '../interfaces/gyms.repository';
import { randomUUID } from 'node:crypto';

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async searchMany(search: string, page: number) {
    return this.items.filter((item) => item.name.includes(search)).slice((page - 1) * 20, page * 20);
  }

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id);

    if (!gym) return null;

    return gym;
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym: Gym = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    };

    this.items.push(gym);

    return gym;
  }
}
