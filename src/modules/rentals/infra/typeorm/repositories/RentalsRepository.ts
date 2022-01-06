import { getRepository, Repository } from 'typeorm';
import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { Rental } from '../entities/Rental';

export class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;
  constructor() {
    this.repository = getRepository(Rental);
  }

  async create({
    user_id,
    car_id,
    expected_return_date,
    id,
    end_date,
    total
  }: ICreateRentalDTO) {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
      id,
      end_date,
      total
    });

    await this.repository.save(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne(id);

    return rental;
  }

  findByUserId(user_id: string): Promise<Rental[]> {
    const rentals = this.repository.find({
      where: { user_id },
      relations: ['car']
    });

    return rentals;
  }

  async findOpenRentalCarById(car_id: string): Promise<Rental> {
    const rentalOpenByCar = await this.repository.findOne({
      where: { car_id, end_date: null }
    });

    return rentalOpenByCar;
  }

  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    const rentalOpenByUser = await this.repository.findOne({
      where: { user_id, end_date: null }
    });

    return rentalOpenByUser;
  }
}
