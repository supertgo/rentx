/* eslint-disable no-useless-constructor */
import { Request, Response } from 'express';

import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  handle(req: Request, res: Response): Response {
    const categoriesList = this.listCategoriesUseCase.execute();
    return res.json(categoriesList);
  }
}

export { ListCategoriesController };
