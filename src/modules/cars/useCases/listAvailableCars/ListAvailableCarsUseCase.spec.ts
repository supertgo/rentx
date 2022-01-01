import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });
  it('should be able to list all available cars', async () => {
    await carsRepositoryInMemory.create({
      name: 'carinho',
      description: 'description name',
      daily_rate: 1400,
      license_plate: 'ABC-1234',
      fine_amount: 100,
      brand: 'brand',
      category_id: 'd871a35b-8feb-4914-85af-5cc39a9cf754'
    });

    await carsRepositoryInMemory.create({
      name: 'carinho 2',
      description: 'description name',
      daily_rate: 140,
      license_plate: 'ABC-12345',
      fine_amount: 100,
      brand: 'brand',
      category_id: 'd871a35b-8feb-4914-85af-5cc39a9cf754'
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toHaveLength(2);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car_name',
      description: 'description name',
      daily_rate: 1400,
      license_plate: 'ABC-1234',
      fine_amount: 100,
      brand: 'brand_test',
      category_id: 'd871a35b-8feb-4914-85af-5cc39a9cf754'
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: car.name
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car_name',
      description: 'description name',
      daily_rate: 1400,
      license_plate: 'ABC-1234',
      fine_amount: 100,
      brand: 'brandTest',
      category_id: 'd871a35b-8feb-4914-85af-5cc39a9cf754'
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: car.brand
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category id', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car_name',
      description: 'description name',
      daily_rate: 1400,
      license_plate: 'ABC-1234',
      fine_amount: 100,
      brand: 'brandTest',
      category_id: '1d871a35b-8feb-4914-85af-5cc39a9cf754'
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: car.category_id
    });

    expect(cars).toEqual([car]);
  });
});
