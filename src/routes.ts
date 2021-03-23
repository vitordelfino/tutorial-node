import { Router } from 'express';

import UserRoutes from '@apps/Users/routes';

const route = Router();

route.use('/users', UserRoutes);

export default route;
