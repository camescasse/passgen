import request from 'supertest';
import { describe, expect, it } from 'vitest';
import server from '../../../app';

describe('/api', () => {
  describe('GET /', () => {
    it('should return a welcome message', async () => {
      const res = await request(server).get('/api');

      expect(res.status).toBe(200);
    });
  });
});
