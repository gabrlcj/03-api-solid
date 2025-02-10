import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
      name: 'Near Gym',
      description: null,
      phone: null,
      latitude: -25.4677022,
      longitude: -49.2942842,
    });

    await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
      name: 'Far Gym',
      description: null,
      phone: null,
      latitude: -26.4677022,
      longitude: -49.2942842,
    });

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({ latitude: -25.4677022, longitude: -49.2942842 })
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        name: 'Near Gym',
      }),
    ]);
  });
});
