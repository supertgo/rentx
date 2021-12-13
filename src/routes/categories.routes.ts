import { Router } from 'express';

import { CategorieRespository } from '../repositories/CategorieRespository';

const categoriesRoutes = Router();
const categoryRepository = new CategorieRespository();

categoriesRoutes.post('/', (req, res) => {
  const { name, description } = req.body;
  const categoryAlereadyExists = categoryRepository.findByName(name);

  if (categoryAlereadyExists) {
    return res.status(400).json({ error: 'This category already exists' });
  }

  categoryRepository.create({ name, description });

  return res.status(201).send();
});

categoriesRoutes.get('/', (req, res) => {
  const categoriesList = categoryRepository.list();
  res.json(categoriesList);
});

export default categoriesRoutes;
