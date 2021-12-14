/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */

import { CategorieRespository } from '../repositories/CategorieRespository';

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryService {
  constructor(private categoriesRepository: CategorieRespository) {}

  execute({ name, description }: IRequest) {
    const categoryAlereadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlereadyExists) {
      throw new Error('This category already exists!');
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryService };
