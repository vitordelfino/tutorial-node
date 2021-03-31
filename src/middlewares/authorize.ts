import { Request, Response, NextFunction } from 'express';
import { CustomError } from 'express-handler-errors';
import { verify } from 'jsonwebtoken';

import { auth } from '@config/index';

import logger from '@middlewares/logger';

export const authorize = (
  req: Request,
  _: Response,
  next: NextFunction
): void => {
  // coletamos o token do header da requisição
  const token = req.headers.authorization;
  logger.info(`Authorize::validate token::${token}`);

  // se não existir o token, devolvemos 401, que é o HTTP code para não autorizado
  if (!token)
    return next(
      new CustomError({
        code: 'UNAUTHORIZED',
        message: 'Token não enviado',
        status: 401,
      })
    );
  try {
    // Aqui fazemos a validação do token
    const decoded = verify(token, auth.secret) as any;
    req.user = decoded;
    logger.info(`Authorize::user authorized::`);
    // No sucesso da validação a request segue em frente ...
    return next();
  } catch (e) {
    // Se der erro na validação, devolvemos 401 novamente
    logger.error(`Authorize::error decode token::${e.message}`);
    return next(
      new CustomError({
        code: 'UNAUTHORIZED',
        message: 'Token inválido',
        status: 401,
      })
    );
  }
};
