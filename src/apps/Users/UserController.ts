import { Request, Response } from 'express';

import UserService from './UserService';

export const create = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const response = await UserService.create(req.body);
  return res.json(response);
};

export const findOne = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const response = await UserService.findOne(req.user);
  return res.json(response);
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const response = await UserService.update(req.params.id, req.body.name);
  return res.json(response);
};

export const deleteOne = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const response = await UserService.delete(req.params.id);
  return res.json(response);
};
