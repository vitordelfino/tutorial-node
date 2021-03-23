import connection from '@config/db';
import { server } from '@config/index';

import logger from '@middlewares/logger';

connection.then(() => {
  logger.info(`Database connected`);
  require('./app').default.app.listen(server.port, () => {
    logger.info('Server running', { port: server.port, mode: server.env });
  });
});
