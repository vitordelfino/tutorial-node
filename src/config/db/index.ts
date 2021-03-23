import { createConnections } from 'typeorm';

import { Users } from '@apps/Users/Users.entity';

import { dbConnections, server } from '../index';

const connection = createConnections([
  {
    name: dbConnections.mongo.name,
    type: 'mongodb',
    url: dbConnections.mongo.conn,
    entities: [Users],
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: server.env === 'dev', // Se o ambiente for dev, o typeorm se incarrega de gerar e alterar as tabelas
  },
]);

export default connection;
