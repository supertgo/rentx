import dayjs from 'dayjs';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe('Create rental', () => {
  const dayPuls24hours = dayjs().add(1, 'day').toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it('should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Test',
      description: 'Car test',
      daily_rate: 10,
      license_plate: 'Test',
      fine_amount: 40,
      category_id: '1234',
      brand: 'brad'
    });
    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: car.id,
      expected_return_date: dayPuls24hours
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is another open rental to the same user', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: '1111',
      user_id: '12345',
      expected_return_date: dayPuls24hours
    });

    await expect(
      createRentalUseCase.execute({
        user_id: '12345',
        car_id: '12121212',
        expected_return_date: dayPuls24hours
      })
    ).rejects.toEqual(
      new AppError('There is a rental in progress for this user')
    );
  });

  it('should not be able to create a new rental to the same car', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: '1212122',
      user_id: '54321',
      expected_return_date: dayPuls24hours
    });

    await expect(
      createRentalUseCase.execute({
        user_id: '54321',
        car_id: '1212122',
        expected_return_date: dayPuls24hours
      })
    ).rejects.toEqual(
      new AppError('There is a rental in progress for this user')
    );
  });

  it('should not be able to create a rental with invalid return time', async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: '12345',
        car_id: '1212122',
        expected_return_date: dayjs().toDate()
      })
    ).rejects.toEqual(
      new AppError(
        'The diff between end date and start date should be at minimun 24 hours'
      )
    );
  });
});
