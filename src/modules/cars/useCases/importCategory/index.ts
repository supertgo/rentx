import { CategoriesRespository } from '../../repositories/implementations/CategoriesRespository';
import { ImportCategoryController } from './ImportCategoryController';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

const categoriesRepository = CategoriesRespository.getInstance();
const importCategoryUsecase = new ImportCategoryUseCase(categoriesRepository);
const importCategoryController = new ImportCategoryController(
  importCategoryUsecase
);

export { importCategoryController };
