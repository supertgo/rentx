import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import {
  ICategoryRepository,
  ICreateCategoryDTO
} from '../ICategoryRepository';

class CategoriesRepositoryInMemory implements ICategoryRepository {
  categories: Category[] = [];

  async findByName(name: string): Promise<Category> {
    const categories = this.categories.find(
      (category) => category.name === name
    );

    return categories;
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const newCategory = new Category();

    Object.assign(newCategory, {
      name,
      description
    });

    this.categories.push(newCategory);
  }
}

export { CategoriesRepositoryInMemory };
