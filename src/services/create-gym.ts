import { CreateGymParams, CreateGymResponse } from '@/services/interfaces/create-gym';
import { GymsRepository } from '@/repositories/interfaces/gyms.repository';

export class CreateGymService {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ name, description, phone, latitude, longitude }: CreateGymParams): Promise<CreateGymResponse> {
    const gym = await this.gymsRepository.create({
      name,
      description,
      phone,
      latitude,
      longitude,
    });

    return { gym };
  }
}
