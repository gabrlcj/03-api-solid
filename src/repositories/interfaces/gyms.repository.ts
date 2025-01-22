import { Gym, Prisma } from '@prisma/client';

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>;
  create(data: Prisma.GymCreateInput): Promise<Gym>;
  searchMany(search: string, page: number): Promise<Gym[]>;
}
