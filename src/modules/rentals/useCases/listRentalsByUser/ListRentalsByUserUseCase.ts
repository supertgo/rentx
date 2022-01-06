import { inject, injectable } from 'tsyringe';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

@injectable()
export class ListRentalsByUserUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute(user_id: string): Promise<Rental[]> {
    const rentalsByUser = await this.rentalsRepository.findByUserId(user_id);

    return rentalsByUser;
  }
}
