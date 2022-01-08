import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

export class sendForgotPasswordMailController {
  async execute(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    const sendForgotPasswordMailUseCase = container.resolve(
      SendForgotPasswordMailUseCase
    );

    sendForgotPasswordMailUseCase.execute(email);

    return res.send();
  }
}
