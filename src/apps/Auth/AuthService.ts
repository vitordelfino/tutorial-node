/* eslint-disable no-underscore-dangle */
import { CustomError } from 'express-handler-errors';
import { sign } from 'jsonwebtoken';
import { MongoRepository, getConnection } from 'typeorm';

import { dbConnections, auth } from '@config/index';

import { Users } from '@apps/Users/Users.entity';

import logger from '@middlewares/logger';

class AuthService {
  private readonly repository: MongoRepository<Users>;

  constructor() {
    this.repository = getConnection(
      dbConnections.mongo.name
    ).getMongoRepository(Users);
  }

  async auth(data: {
    document: string;
    password: string;
  }): Promise<{ token: string }> {
    const { document, password } = data;
    logger.info(`AuthService::auth::`, data);

    try {
      // Buscando usuário
      const user = await this.repository.findOne({ document, password });

      // Validando existência
      if (!user) {
        throw new CustomError({
          code: 'USER_NOT_FOUND',
          message: 'Usuário não encontrado',
          status: 404,
        });
      }

      // Gerando token
      const token = await sign(
        {
          _id: user._id,
          document: user.document,
          name: user.name,
        },
        auth.secret,
        {
          expiresIn: auth.expires,
        }
      );

      return {
        token,
      };
    } catch (e) {
      if (e instanceof CustomError) throw e;
      logger.error(`AuthService::auth::${e.message}`);

      throw new CustomError({
        code: 'ERROR_AUTHENTICATE',
        message: 'Erro ao autenticar',
        status: 500,
      });
    }
  }
}

export default new AuthService();
