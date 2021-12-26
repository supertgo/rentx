/* eslint-disable no-useless-constructor */

import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';

import { ICategoryRepository } from '../../repositories/ICategoryRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoryRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlereadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlereadyExists) {
      throw new AppError('This category already exists!');
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
