/* eslint-disable no-useless-constructor */
import Category from '../../entities/category';
import { ICategoryRepository } from '../../repositories/ICategoryRepository';

class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoryRepository) {}

  execute(): Category[] {
    const categories = this.categoriesRepository.list();

    return categories;
  }
}

export { ListCategoriesUseCase };
