/* eslint-disable no-useless-constructor */

import { ICategoryRepository } from '../../repositories/ICategoryRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoryRepository) {}

  execute({ name, description }: IRequest) {
    const categoryAlereadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlereadyExists) {
      throw new Error('This category already exists!');
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
