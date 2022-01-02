/* eslint-disable camelcase */
/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
export class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const carAlreadyExist = await this.carsRepository.findById(car_id);

    if (!carAlreadyExist) {
      throw new AppError('This car does not exist!');
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id
    );

    carAlreadyExist.specifications = specifications;

    await this.carsRepository.create(carAlreadyExist);

    return carAlreadyExist;
  }
}
