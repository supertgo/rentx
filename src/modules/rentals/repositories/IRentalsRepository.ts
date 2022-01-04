import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO';
import { Rental } from '../infra/typeorm/entities/Rental';

export interface IRentalsRepository {
  create({ user_id, car_id, expected_return_date }: ICreateRentalDTO);
  findById(id: string): Promise<Rental>;
  findOpenRentalCarById(car_id: string): Promise<Rental>;
  findOpenRentalByUserId(user_id: string): Promise<Rental>;
}
