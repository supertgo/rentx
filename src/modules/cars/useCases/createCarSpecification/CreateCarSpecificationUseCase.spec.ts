import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('Create car pecification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });
  it('should not be able to add a new specification to the car that does not exist', async () => {
    const car_id = 'null';
    const specifications_id = ['null'];
    await expect(
      createCarSpecificationUseCase.execute({
        car_id,
        specifications_id
      })
    ).rejects.toEqual(new AppError('This car does not exist!'));
  });

  it('should be able to add a new specification to the car ', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'name car',
      description: 'description car',
      daily_rate: 100.0,
      license_plate: 'ABC-12345',
      fine_amount: 60,
      brand: 'brand',
      category_id: 'category'
    });

    const specification = await specificationsRepositoryInMemory.create({
      name: 'test',
      description: 'test'
    });

    const specifications_id = [specification.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id
    });

    expect(specificationsCars).toHaveProperty('specifications');
    expect(specificationsCars.specifications.length).toBe(1);
  });
});
