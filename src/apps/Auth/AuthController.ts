import { Request, Response } from 'express';

import AuthService from './AuthService';

export const auth = async (req: Request, res: Response): Promise<Response> => {
  const { document, password } = req.body;
  const response = await AuthService.auth({ document, password });
  return res.json(response);
};
