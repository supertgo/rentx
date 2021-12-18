/* eslint-disable no-useless-constructor */
import { Request, Response } from 'express';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

class ImportCategoryController {
  constructor(private importCategoryUsecase: ImportCategoryUseCase) {}

  handle(req: Request, res: Response): Response {
    const { file } = req;
    this.importCategoryUsecase.execute(file);

    return res.send();
  }
}

export { ImportCategoryController };
