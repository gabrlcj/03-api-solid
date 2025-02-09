import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe('Search Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to search gyms', async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
      name: 'JavaScript Gym',
      description: 'Some description',
      phone: '41999999999',
      latitude: -25.4677022,
      longitude: -49.2942842,
    });

    await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
      name: 'TypeScript Gym',
      description: 'Some description',
      phone: '41999999999',
      latitude: -25.4677022,
      longitude: -49.2942842,
    });

    const response = await request(app.server)
      .get('/gyms/search')
      .query({ query: 'JavaScript' })
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        name: 'JavaScript Gym',
      }),
    ]);
  });
});
