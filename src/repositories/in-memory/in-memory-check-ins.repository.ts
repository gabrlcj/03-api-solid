import { randomUUID } from 'node:crypto';
import { CheckIn, Prisma } from '@prisma/client';
import { CheckInsRepository } from '../interfaces/check-ins.repository';

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = [];

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn: CheckIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };

    this.items.push(checkIn);

    return checkIn;
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const checkInOnSameDay = this.items.find(
      (checkIn) => checkIn.user_id === userId && checkIn.created_at.toDateString() === date.toDateString()
    );

    if (!checkInOnSameDay) {
      return null;
    }

    return checkInOnSameDay;
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    return this.items.filter((checkIn) => checkIn.user_id === userId).slice((page - 1) * 20, page * 20);
  }
}
