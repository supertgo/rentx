import { ImportCategoryController } from './ImportCategoryController';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

const importCategoryUsecase = new ImportCategoryUseCase();
const importCategoryController = new ImportCategoryController(
  importCategoryUsecase
);

export { importCategoryController };
