/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

export class CreateCarSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { specifications_id } = req.body;

    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase
    );

    const cars = await createCarSpecificationUseCase.execute({
      car_id: id,
      specifications_id
    });

    return res.json(cars);
  }
}
