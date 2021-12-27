/* eslint-disable camelcase */
import { container } from 'tsyringe';
/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

class UpdateUserAvatarController {
  async handle(req: Request, res: Response) {
    const { id } = req.user;
    const avatar_file = null;
    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    await updateUserAvatarUseCase.execute({ user_id: id, avatar_file });

    res.status(204).send();
  }
}

export { UpdateUserAvatarController };
