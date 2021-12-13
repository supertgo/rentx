/* eslint-disable import/prefer-default-export */
import Category from '../models/category';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

class CategorieRespository {
  private categories: Category[];

  constructor() {
    this.categories = [];
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

export { CategorieRespository };
