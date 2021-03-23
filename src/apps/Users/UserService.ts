import { CustomError } from 'express-handler-errors';
import { ObjectID } from 'mongodb';
import { getConnection, MongoRepository } from 'typeorm';

import { dbConnections } from '@config/index';

import { Users } from './Users.entity';

class UserService {
  private readonly repository: MongoRepository<Users>;

  constructor() {
    this.repository = getConnection(
      dbConnections.mongo.name
    ).getMongoRepository(Users);
  }

  async create(user: Users): Promise<Users> {
    try {
      const response = await this.repository.save(user);
      return response;
    } catch (e) {
      if (e.code === 11000)
        throw new CustomError({
          code: 'USER_ALREADY_EXISTS',
          message: 'Usuário já existente',
          status: 409,
        });
      throw e;
    }
  }

  async findOne(_id: string): Promise<Users> {
    const user = await this.repository.findOne(_id);
    if (!user)
      throw new CustomError({
        code: 'USER_NOT_FOUND',
        message: 'Usuário não encontrado',
        status: 404,
      });

    return user;
  }

  async update(_id: string, name: string): Promise<Users> {
    await this.repository.updateOne(
      {
        _id: new ObjectID(_id),
      },
      {
        $set: {
          name,
        },
      }
    );
    return this.findOne(_id);
  }

  async delete(_id: string): Promise<Users> {
    const user = await this.findOne(_id);
    await this.repository.deleteOne({
      _id: new ObjectID(_id),
    });
    return user;
  }
}

export default new UserService();
