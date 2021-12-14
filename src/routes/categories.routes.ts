import { Router } from 'express';

import { CategorieRespository } from '../repositories/CategorieRespository';
import { CreateCategoryService } from '../services/CreateCategoryService';

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
