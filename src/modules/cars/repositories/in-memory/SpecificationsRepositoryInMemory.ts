import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository
} from '../ISpecificationsRepository';

export class SpecificationsRepositoryInMemory
  implements ISpecificationsRepository
{
  specification: Specification[] = [];

  async create({
    name,
    description
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description
    });

    this.specification.push(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    return this.specification.find(
      (specification) => specification.name === name
    );
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = this.specification.filter((specifications) =>
      ids.includes(specifications.id)
    );

    return allSpecifications;
  }
}
