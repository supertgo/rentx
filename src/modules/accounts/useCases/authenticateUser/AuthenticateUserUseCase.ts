/* eslint-disable class-methods-use-this */
import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { AuthenticateUserUseCase } from './AuthenticateUserUseController';

class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authtenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const token = await authtenticateUserUseCase.execute({
      email,
      password
    });

    return res.json(token);
  }
}

export { AuthenticateUserController };
