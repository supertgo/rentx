import { Router } from 'express';

import { CategorieRespository } from '../modules/cars/repositories/CategorieRespository';
import { CreateCategoryService } from '../modules/cars/services/CreateCategoryService';

const categoriesRoutes = Router();
const categoryRepository = new CategorieRespository();

categoriesRoutes.post('/', (req, res) => {
  const { name, description } = req.body;
  const createCategoryService = new CreateCategoryService(categoryRepository);

  createCategoryService.execute({ name, description });
  return res.status(201).send();
});

categoriesRoutes.get('/', (req, res) => {
  const categoriesList = categoryRepository.list();
  res.json(categoriesList);
});

export default categoriesRoutes;
