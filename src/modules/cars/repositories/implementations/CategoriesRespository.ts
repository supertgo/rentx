/* eslint-disable import/prefer-default-export */
import Category from '../../entities/category';
import {
  ICategoryRepository,
  ICreateCategoryDTO
} from '../ICategoryRepository';

class CategoriesRespository implements ICategoryRepository {
  private categories: Category[];

  private static INSTANCE: CategoriesRespository;

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoriesRespository {
    if (!CategoriesRespository.INSTANCE) {
      CategoriesRespository.INSTANCE = new CategoriesRespository();
    }

    return CategoriesRespository.INSTANCE;
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      createdAt: new Date()
    });

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    const category = this.categories.find(
      (categories) => categories.name === name
    );

    return category;
  }
}

export { CategoriesRespository };
