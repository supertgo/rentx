import { Router } from 'express';

import { CategoriesRespository } from '../modules/cars/repositories/CategoriesRespository';
import { createCategoryController } from '../modules/cars/useCases/createCategory';

const categoriesRoutes = Router();
const categoryRepository = new CategoriesRespository();

categoriesRoutes.post('/', (req, res) => {
  return createCategoryController.handle(req, res);
});

categoriesRoutes.get('/', (req, res) => {
  const categoriesList = categoryRepository.list();
  res.json(categoriesList);
});

export default categoriesRoutes;
