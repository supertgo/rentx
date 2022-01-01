import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';
import { AppError } from '@shared/errors/AppError';
import { NextFunction, Response, Request } from 'express';

export async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.user;
  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(id);

  if (!user.isAdimin) {
    throw new AppError('This User is not an admin');
  }

  return next();
}
