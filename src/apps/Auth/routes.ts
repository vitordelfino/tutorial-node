import { Router } from 'express';

import * as controller from './AuthController';
import { validateAuthPayload } from './validator';

import 'express-async-errors';

const routes = Router();

routes.post('/', validateAuthPayload, controller.auth);

export default routes;
