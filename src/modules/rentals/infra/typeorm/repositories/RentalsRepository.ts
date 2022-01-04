/* eslint-disable camelcase */
import { getRepository, Repository } from 'typeorm';
import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { Rental } from '../entities/Rental';

export class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;
  constructor() {
    this.repository = getRepository(Rental);
  }

  async create({ user_id, car_id, expected_return_date }: ICreateRentalDTO) {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date
    });

    await this.repository.save(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne(id);

    return rental;
  }

  async findOpenRentalCarById(car_id: string): Promise<Rental> {
    const rentalOpenByCar = await this.repository.findOne({ car_id });

    return rentalOpenByCar;
  }

  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    const rentalOpenByUser = await this.repository.findOne({ user_id });

    return rentalOpenByUser;
  }
}
