import { MockProxy } from 'jest-mock-extended';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import { MongoRepository } from 'typeorm';

jest.mock('typeorm');
jest.mock('../../src/middlewares/logger');
describe('## Auth Module ##', () => {
  const { app } = require('../../src/app').default;

  const repository = require('typeorm').mongoRepositoryMock as MockProxy<
    MongoRepository<any>
  >;

  describe('## Login ##', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });
    test('should return error when user does not exists', async () => {
      repository.findOne.mockResolvedValue(null);
      await request(app)
        .post('/api/auth')
        .send({ document: '42780908890', password: '123456' })
        .expect(404, {
          errors: [
            {
              code: 'USER_NOT_FOUND',
              message: 'Usuário não encontrado',
              status: 404,
            },
          ],
        });
    });

    test('should return an token', async () => {
      repository.findOne.mockResolvedValue({
        _id: '6064b5560e12df0b9eccbcee',
        document: '42780908890',
        name: 'Vitor',
      });

      const spy = jest.spyOn(jwt, 'sign');
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDY0YjU1NjBlMTJkZjBiOWVjY2JjZWUiLCJkb2N1bWVudCI6IjQyNzgwOTA4ODkwIiwibmFtZSI6IlZpdG9yIiwiaWF0IjoxNjE3MjE2NTE1LCJleHAiOjE2MTcyMjAxMTV9.oZSom3PhiuLp554A_R4VajBV67T1Sb3DbCEGkNwMCEE';
      spy.mockReturnValue(token as any);

      await request(app)
        .post('/api/auth')
        .send({ document: '42780908890', password: '123456' })
        .expect(200, {
          token,
        });
    });

    test('should return error when generate token', async () => {
      repository.findOne.mockResolvedValue({
        _id: '6064b5560e12df0b9eccbcee',
        document: '42780908890',
        name: 'Vitor',
      });

      const spy = jest.spyOn(jwt, 'sign');

      spy.mockImplementation(() => {
        throw new Error('Error to generate token');
      });

      await request(app)
        .post('/api/auth')
        .send({ document: '42780908890', password: '123456' })
        .expect(500, {
          errors: [
            {
              code: 'ERROR_AUTHENTICATE',
              message: 'Erro ao autenticar',
              status: 500,
            },
          ],
        });
    });
  });
});
