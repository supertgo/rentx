/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import Category from '../models/category';
import { ICategoryRepository, ICreateCategoryDTO } from './ICategoryRepository';

class PostgresCategoryRepository implements ICategoryRepository {
  findByName(name: string): Category {
    console.log(name);

    return null;
  }

  list(): Category[] {
    return null;
  }

  create({ name, description }: ICreateCategoryDTO): void {
    console.log(name, description);
  }
}

export { PostgresCategoryRepository };
