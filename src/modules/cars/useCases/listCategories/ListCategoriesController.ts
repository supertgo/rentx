/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);
    const categoriesList = await listCategoriesUseCase.execute();

    return res.json(categoriesList);
  }
}

export { ListCategoriesController };
