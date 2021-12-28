/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe';

import { ICategoryRepository } from '@modules/cars/repositories/ICategoryRepository';
import { Category } from '@modules/cars/entities/Category';

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoryRepository
  ) {}

  execute(): Promise<Category[]> {
    const categories = this.categoriesRepository.list();

    return categories;
  }
}

export { ListCategoriesUseCase };
