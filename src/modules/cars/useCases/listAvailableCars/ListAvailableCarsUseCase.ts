/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
/* eslint-disable no-useless-constructor */
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  name?: string;
  brand?: string;
  category_id?: string;
}

@injectable()
export class ListAvailableCarsUseCase {
  constructor(@inject('CarsRepository')
  private carsRepository: ICarsRepository) {}

  async execute({ name, brand, category_id }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(
      name,
      brand,
      category_id
    );

    return cars;
  }
}
