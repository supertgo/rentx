import { ICreateCarDTO } from '../dtos/ICreateCarDto';
import { Car } from '../infra/typeorm/entities/Car';

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findById(id: string): Promise<Car>;
  findAvailable(
    name?: string,
    brand?: string,
    category_id?: string
  ): Promise<Car[]>;
}

export { ICarsRepository };