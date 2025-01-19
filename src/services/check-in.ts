import { CheckInRequest, CheckInResponse } from '@/services/interfaces/check-in';
import { CheckInsRepository } from '@/repositories/interfaces/check-ins.repository';
import { GymsRepository } from '@/repositories/interfaces/gyms.repository';
import { ResourceNotFoundError } from './errors/resource-not-found';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';

export class CheckInService {
  constructor(private checkInsRepository: CheckInsRepository, private gymsRepository: GymsRepository) {}

  async execute({ userId, gymId, userLatitude, userLongitude }: CheckInRequest): Promise<CheckInResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
    );

    const MAX_DISTANCE_IN_KILOMETERS = 0.1;

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new Error();
    }

    const checkInOnSameDay = await this.checkInsRepository.findCheckInByUserOnDate(userId, new Date());

    if (checkInOnSameDay) {
      throw new Error();
    }

    const checkIn = await this.checkInsRepository.create({ user_id: userId, gym_id: gymId });

    return { checkIn };
  }
}
