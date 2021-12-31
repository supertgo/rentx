import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarUseCase } from './CreateCarUseCase';

describe('Create Car', () => {
  let createCarUseCase: CreateCarUseCase;
  let carsRepositoryInMemory: CarsRepositoryInMemory;

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'name car',
      description: 'description car',
      daily_rate: 100.0,
      license_plate: 'ABC-12345',
      fine_amount: 60,
      brand: 'brand',
      category_id: 'category'
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with the same license_plate', () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'car 1',
        description: 'description car',
        daily_rate: 100.0,
        license_plate: '1234',
        fine_amount: 60,
        brand: 'brand',
        category_id: 'category'
      });

      await createCarUseCase.execute({
        name: 'car 2',
        description: 'description car',
        daily_rate: 100.0,
        license_plate: '1234',
        fine_amount: 60,
        brand: 'brand',
        category_id: 'category'
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a car with prop avaible true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'name car',
      description: 'description car',
      daily_rate: 100.0,
      license_plate: 'ABC-12345',
      fine_amount: 60,
      brand: 'brand',
      category_id: 'category'
    });

    expect(car.available).toBe(true);
  });
});
