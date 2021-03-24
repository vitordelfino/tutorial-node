import { mock } from 'jest-mock-extended';
import { Repository, MongoRepository } from 'typeorm';

export const repositoryMock = mock<Repository<any>>();

export const mongoRepositoryMock = mock<MongoRepository<any>>();

export const getConnection = jest.fn().mockReturnValue({
  getRepository: () => repositoryMock,
  getMongoRepository: () => mongoRepositoryMock,
});

export class BaseEntity {}
export const ObjectIdColumn = () => {};
export const Column = () => {};
export const Index = () => {};
export const CreateDateColumn = () => {};
export const UpdateDateColumn = () => {};
export const Entity = () => {};
