import { MockProxy } from 'jest-mock-extended';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import { MongoRepository } from 'typeorm';

jest.mock('typeorm');
jest.mock('../../src/middlewares/logger');
describe('## User Module ##', () => {
  const { app } = require('../../src/app').default;

  const repository = require('typeorm').mongoRepositoryMock as MockProxy<
    MongoRepository<any>
  >;

  describe('## GET ##', () => {
    // Aqui estamos restaurando o mock
    afterEach(() => {
      jest.resetAllMocks();
    });
    test('should return error when user does not exists', async () => {
      /**
       * Vamos espionar a função verify,
       * a mesma utilizada no middleware e modificar o seu comportamento
       * é um outro jeito de mocar funções com jest
       *
       */
      const spy = jest.spyOn(jwt, 'verify');
      spy.mockReturnValue({
        _id: '6064b5560e12df0b9eccbcee',
        document: '42780908890',
        name: 'Vitor',
      } as any);
      repository.findOne.mockResolvedValue(null);
      await request(app)
        .get('/api/users')
        .set('Authorization', 'token')
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

    test('should return an user', async () => {
      const spy = jest.spyOn(jwt, 'verify');
      spy.mockReturnValue({
        _id: '6064b5560e12df0b9eccbcee',
        document: '42780908890',
        name: 'Vitor',
      } as any);
      const user = {
        _id: '6064b5560e12df0b9eccbcee',
        name: 'Teste',
        password: '1234',
      };
      repository.findOne.mockResolvedValue(user);
      await request(app)
        .get('/api/users')
        .set('Authorization', 'token')
        .expect(200, user);
    });
  });

  describe('## POST ##', () => {
    test('should return error when document is invalid', async () => {
      await request(app)
        .post('/api/users')
        .send({ name: 'Teste', document: '1234', password: '0123456789' })
        .expect(400, {
          errors: [
            {
              code: 'ValidationError',
              message: 'document: deve conter exatamente 11 caracteres',
            },
          ],
        });
    });
    test('should return error when password is invalid', async () => {
      await request(app)
        .post('/api/users')
        .send({
          name: 'Teste',
          document: '12345678900',
          password: '1234',
        })
        .expect(400, {
          errors: [
            {
              code: 'ValidationError',
              message: 'password: valor muito curto (mí­nimo 6 caracteres)',
            },
          ],
        });
    });
    test('should return error when payload is invalid', async () => {
      await request(app)
        .post('/api/users')
        .send({})
        .expect(400, {
          errors: [
            { code: 'ValidationError', message: 'name é um campo obrigatório' },
            {
              code: 'ValidationError',
              message: 'document é um campo obrigatório',
            },
            {
              code: 'ValidationError',
              message: 'password é um campo obrigatório',
            },
          ],
        });
    });

    test('should return error when user already exists', async () => {
      repository.save.mockRejectedValue({
        code: 11000,
      });

      await request(app)
        .post('/api/users')
        .send({
          name: 'Teste',
          document: '12345678900',
          password: '1234567890',
        })
        .expect(409, {
          errors: [
            {
              code: 'USER_ALREADY_EXISTS',
              message: 'Usuário já existente',
              status: 409,
            },
          ],
        });
    });

    test('should return error when create user', async () => {
      repository.save.mockRejectedValue(new Error('Some Exception'));

      await request(app)
        .post('/api/users')
        .send({
          name: 'Teste',
          document: '12345678900',
          password: '1234567890',
        })
        .expect(500, {
          errors: [{ code: 'E0001', message: 'Some Exception' }],
        });
    });

    test('should create an user', async () => {
      const user = {
        name: 'Teste',
        document: '12345678900',
        password: '1234567890',
      };
      repository.save.mockResolvedValue({
        ...user,
        _id: 'some-id',
      });

      await request(app).post('/api/users').send(user).expect(200, {
        name: 'Teste',
        document: '12345678900',
        password: '1234567890',
        _id: 'some-id',
      });
    });
  });

  describe('## PUT ##', () => {
    test('should return error when user does not exists', async () => {
      repository.updateOne.mockResolvedValue({} as any);
      repository.findOne.mockResolvedValue(null);
      await request(app)
        .put('/api/users/6001abf43d4675bc1aa693bd')
        .send({ name: 'Teste' })
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

    test('should return updated user', async () => {
      const user = {
        name: 'Teste',
        document: '12345678900',
        password: '1234567890',
      };
      repository.updateOne.mockResolvedValue({} as any);

      repository.findOne.mockResolvedValue({
        ...user,
        _id: '6001abf43d4675bc1aa693bd',
      });

      await request(app)
        .put('/api/users/6001abf43d4675bc1aa693bd')
        .send({ name: 'Teste' })
        .expect(200, {
          ...user,
          _id: '6001abf43d4675bc1aa693bd',
        });
    });
  });

  describe('## DELETE ##', () => {
    test('should return error when user does not exists', async () => {
      repository.findOne.mockResolvedValue(null);
      await request(app)
        .delete('/api/users/6001abf43d4675bc1aa693bd')
        .send({ name: 'Teste' })
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

    test('should return deleted user', async () => {
      const user = {
        name: 'Teste',
        document: '12345678900',
        password: '1234567890',
      };

      repository.findOne.mockResolvedValue({
        ...user,
        _id: '6001abf43d4675bc1aa693bd',
      });

      repository.deleteOne.mockResolvedValue({} as any);

      await request(app)
        .delete('/api/users/6001abf43d4675bc1aa693bd')
        .send({ name: 'Teste' })
        .expect(200, {
          ...user,
          _id: '6001abf43d4675bc1aa693bd',
        });
    });
  });
});
