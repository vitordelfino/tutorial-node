import { Router } from 'express';

import AuthRoutes from '@apps/Auth/routes';
import UserRoutes from '@apps/Users/routes';

const route = Router();

route.use('/users', UserRoutes);
route.use('/auth', AuthRoutes);
export default route;
